const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
//The check function from express-validator will be used with the handleValidationErrors to validate the body of a request.
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


// Validate Login check these keys and validate them
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];


// Log in
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });
    // If there is no user returned from the login static method, then create a "Login failed" error and invoke the next error-handling middleware with it.
    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        // err.title = 'Login failed';
        err.message = 'Invalid credentials';
        return next(err);
    }

    //  If there is a user returned from the login static method, call setTokenCookie and return a JSON response with the user information.
    const token = await setTokenCookie(res, user);
    let user1 = user.toJSON();
    user1.token = token;
    return res.json({ user: user1 });
});


// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
}
);

// Get current user
router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
        user.toSafeObject();
        return res.json({ "user": user });
    } else return res.json({ "user": null });
});


module.exports = router;
