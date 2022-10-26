const express = require('express');
const { Op, sequelize, Sequelize } = require('sequelize');
const { setTokenCookie, requireAuth, requireProperAuthorization, requireProperAuthorizationForReview } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateRequestReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ gt: 0, lt: 6 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];


// Delete a review
router.delete('/:reviewId', requireAuth, requireProperAuthorizationForReview, async (req, res, next) => {
    const id = req.params.reviewId;
    await Review.destroy({
        where: { id }
    });
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});

// Edit a Review
router.put('/:reviewId', requireAuth, validateRequestReview, async (req, res, next) => {
    const id = req.params.reviewId;
    const reviewTobeEdited = await Review.findOne({
        where: { id },
        raw: true
    });

    if (!reviewTobeEdited) {
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    } else {
        const { review, stars } = req.body;
        reviewTobeEdited.review = review;
        reviewTobeEdited.stars = stars;

        res.json(reviewTobeEdited);
    }

});

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {

    // eager loading
    // const id = req.user.id;
    // const reviews = await Review.findAll({
    //     raw: true,
    //     nest: true,
    //     where: { userId: id },
    //     include: [
    //         {
    //             model: User,
    //             attributes: ['id', 'firstName', 'lastName']
    //         },
    //         {
    //             model: Spot,
    //             include: [{
    //                 model: SpotImage
    //             }],
    //             attributes: {
    //                 exclude: ['createdAt', 'updatedAt', 'description']
    //             }
    //         },
    //         {
    //             model: ReviewImage,
    //             attributes: {
    //                 exclude: ['createdAt', 'updatedAt', 'reviewId']
    //             }
    //         }
    //     ]
    // });

    // const value = reviews[0].Spot.SpotImages.url; // image url

    // reviews[0]['Spot']['previewImage'] = value; // assign for new pair

    // delete reviews[0]['Spot']["SpotImages"];

    // res.json({ "Reviews": reviews });

    // lazy loading
    const id = req.user.id;

    const reviews = await Review.findAll({
        where: { userId: id },
        raw: true
    });

    for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];

        const user = await User.findByPk(id, {
            raw: true,
            attributes: ['id', 'firstName', 'lastName']
        });
        review.User = user;

        const allSpots = await Spot.findAll({
            where: {
                ownerId: id
            },
            raw: true,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'description']
            }
        });
        for (let i = 0; i < allSpots.length; i++) {
            const spot = allSpots[i];
            const spotImage = await SpotImage.findAll({
                raw: true,
                where: {
                    [Op.and]: [
                        {
                            spotId: spot.id
                        },
                        {
                            preview: true
                        }
                    ]
                }
            });
            if (!spotImage.length) {
                spot.previewImage = [];
            } else {
                spot.previewImage = spotImage[0]['url'];
            }
        }
        review.Spot = allSpots;

        const reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            },
            raw: true,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'reviewId']
            }
        });
        review.ReviewImage = reviewImages;
    }
    res.json({
        "Reviews": reviews
    });

});

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const reviewId = req.params.reviewId;

        const review = await Review.findByPk(reviewId, {
            raw: true
        });

        if (!review || review.userId !== userId) {
            res.status(404).json({
                "message": "Review couldn't be found",
                "statusCode": 404
            });
        }
        const imageCount = await ReviewImage.count('url');
        if (imageCount > 10) {
            res.status(403).json({
                "message": "Maximum number of images for this resource was reached",
                "statusCode": 403
            });
        }
        const { url } = req.body;
        const newReviewImage = await ReviewImage.create({ reviewId, url });
        const imageWithScope = await ReviewImage.scope('defaultScope').findByPk(newReviewImage.id);
        res.json(imageWithScope);
    }
    catch (e) {
        console.log(e.message);
    }

});

module.exports = router;
