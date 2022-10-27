const { validationResult } = require('express-validator');


// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);
    let obj = {};
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors
            .array()
            .forEach((error) => {
                let key = error.param;
                let value = error.msg;
                if (key !== undefined) obj[key] = value;
            });
        console.log(errors);

        const err = Error('Validation Error');
        err.errors = obj;
        err.status = 400;
        err.title = 'Validation Error';
        next(err);
    };
    next();
};

module.exports = { handleValidationErrors };
