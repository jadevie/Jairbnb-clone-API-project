// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Set the JWT cookie after a user is logged in or signed up
// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });

    return token;
};

// restoreUser: restore the session user based on the contents of the JWT cookie.
const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

// requireAuth: requiring a session user to be authenticated before accessing a route.
// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error("Authentication required");
    // err.title = 'Unauthorized';
    err.message = "Authentication required";
    err.status = 401;
    return next(err);
};

const requireProperAuthorization = async function (req, res, next) {
    const currentUserId = req.user.id;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }

    if (currentUserId === spot.ownerId) return next();

    const err = new Error("Authentication required");
    err.message = "Forbidden";
    err.status = 403;
    return next(err);
};


const requireProperAuthorizationForReview = async function (req, res, next) {
    const currentUserId = req.user.id;
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId);

    if (!review) {
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    }

    if (currentUserId === review.userId) return next();

    const err = new Error("Authentication required");
    err.message = "Forbidden";
    err.status = 403;
    return next(err);
};



module.exports = { setTokenCookie, restoreUser, requireAuth, requireProperAuthorization, requireProperAuthorizationForReview };
