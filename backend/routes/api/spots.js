const express = require('express');
const { Op, sequelize, Sequelize } = require('sequelize');
const { requireAuth, requireProperAuthorizationForSpot, authenticateSpotNotOwned } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { use } = require('./reviews');
const { raw } = require('express');
const e = require('express');
const router = express.Router();

// Handling validation error for review
const validateRequestForSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors
];

// Handling validation error for review
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


// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, authenticateSpotNotOwned, async (req, res, next) => {
    const userId = req.user.id;
    const { startDate, endDate } = req.body;
    const spotId = req.params.spotId;
    const bookings = await Booking.findAll({ where: { spotId }, raw: true });

    for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i];
        if (new Date(booking.startDate).getTime() === new Date(startDate).getTime()) {

            res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            });
        }
    }

    if (endDate <= startDate) {
        res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        });
    }

    const newBooking = await Booking.create({ userId, spotId, startDate, endDate });
    res.json(newBooking);
});


// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateRequestReview, async (req, res, next) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    const reviews = await Review.findAll({ where: { spotId }, raw: true });

    reviews.forEach(review => {
        if (review.userId === userId) {
            res.status(403).json({
                "message": "User already has a review for this spot",
                "statusCode": 403
            });
        }
    });

    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }

    const { review, stars } = req.body;
    const newReview = await Review.create({ userId, spotId, review, stars });
    res.status(201).json(newReview);
});


// Delete a Spot
router.delete('/:spotId', requireAuth, requireProperAuthorizationForSpot, async (req, res, next) => {
    const spotId = req.params.spotId;
    const spotToBeDeleted = await Spot.findByPk(spotId);
    await spotToBeDeleted.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
});


// Edit a Spot
router.put('/:spotId', requireAuth, requireProperAuthorizationForSpot, validateRequestForSpot, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const editSpot = await Spot.findByPk(spotId);

    if (address) editSpot.address = address;
    if (city) editSpot.city = city;
    if (state) editSpot.state = state;
    if (country) editSpot.country = country;
    if (lat) editSpot.lat = lat;
    if (lng) editSpot.lng = lng;
    if (name) editSpot.name = name;
    if (description) editSpot.description = description;
    if (price) editSpot.price = price;

    await editSpot.save();
    res.json(editSpot);
});


// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, requireProperAuthorizationForSpot, async (req, res, next) => {
    const spotId = req.params.spotId;
    const { url, preview } = req.body;

    const newImage = await SpotImage.create({ spotId, url, preview });
    const data = await SpotImage.scope('defaultScope').findByPk(newImage.id);
    res.json(data);
});


// Create a Spot
router.post('/', requireAuth, validateRequestForSpot, async (req, res, next) => {
    const ownerId = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newSpot = await Spot.create({
        ownerId, address, city, state, country, lat, lng, name, description, price
    });
    res.json(newSpot);
});


// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const id = req.user.id;
    const spots = await Spot.findAll({
        where: { ownerId: id },
        raw: true,
        include: [{
            model: Review,
            attributes: []
        }],
        attributes: { include: [[Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating']] },
        include: [{
            model: Review,
            attributes: []
        }],
        attributes: {
            include: [[Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating']]
        },
        group: ['Spot.id']
    });

    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        const image = await SpotImage.findAll({
            raw: true,
            where: { [Op.and]: [{ spotId: spot.id }, { preview: true }] }
        });

        if (!image.length) spot.previewImage = [];
        else { spot.previewImage = image[0].url; }
    }
    res.json({ "Spots": spots });
});

// Lazy loading
// router.get('/current', requireAuth, async (req, res, next) => {
//     try {
//         const id = req.user.id;
//         const spots = await Spot.findAll({
//             where: {
//                 ownerId: id
//             },
//             raw: true
//         });
//         for (let i = 0; i < spots.length; i++) {
//             const spot = spots[i];
//             const reviews = await Review.findAll({
//                 raw: true,
//                 where: {
//                     spotId: spot.id
//                 },
//                 attributes: {
//                     include: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
//                 },
//                 group: ['Review.id']
//             });
//             const image = await SpotImage.findAll({
//                 raw: true,
//                 where: {
//                     [Op.and]: [
//                         {
//                             spotId: spot.id
//                         },
//                         {
//                             preview: true
//                         }
//                     ]
//                 }
//             });
//             if (!image.length) {
//                 spot.previewImage = [];
//             } else {
//                 spot.previewImage = image[0]['url'];
//             }
//         }
//         res.json({ "Spots": spots });
//     } catch (e) {
//         console.log(e.message);
//     }
// });


router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }

    if (userId !== spot.ownerId) {
        let bookings = await Booking.findAll({
            where: { userId },
            attributes: ['spotId', 'startDate', 'endDate']
        });
        res.json({ "Bookings": bookings });
    }

    if (userId === spot.ownerId) {
        let bookings = await Booking.findAll({
            where: { userId },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        });
        res.json({ "Bookings": bookings });
    }
    res.json({ "Spots": spots });
});

// lazy loading
// router.get('/current', requireAuth, async (req, res, next) => {
//     try {
//         const id = req.user.id;
//         const spots = await Spot.findAll({
//             where: {
//                 ownerId: id
//             },
//             raw: true
//         });

//         for (let i = 0; i < spots.length; i++) {
//             const spot = spots[i];
//             const reviews = await Review.findAll({
//                 raw: true,
//                 where: {
//                     spotId: spot.id
//                 },
//                 attributes: {
//                     include: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
//                 },
//                 group: ['Review.id']
//             });


//             const image = await SpotImage.findAll({
//                 raw: true,
//                 where: {
//                     [Op.and]: [
//                         {
//                             spotId: spot.id
//                         },
//                         {
//                             preview: true
//                         }
//                     ]
//                 }
//             });



//             if (!image.length) {
//                 spot.previewImage = [];
//             } else {
//                 spot.previewImage = image[0]['url'];
//             }

//         }
//         res.json({ "Spots": spots });
//     } catch (e) {
//         console.log(e.message);
//     }
// });

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    if (userId !== spot.ownerId) {
        let bookings = await Booking.findAll({
            where: { userId },
            attributes: ['spotId', 'startDate', 'endDate']
        });
        res.json({ "Bookings": bookings });
    }

    if (userId === spot.ownerId) {
        let bookings = await Booking.findAll({
            where: { userId },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        });
        res.json({ "Bookings": bookings });
    }

});


// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {
    const spotId = req.params.spotId;
    const spots = await Spot.findByPk(spotId);
    if (!spots) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }

    const reviews = await Review.findAll({
        where: { spotId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });
    res.json({ "Reviews": reviews });
});


// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const id = req.params.spotId;
    const spot = await Spot.findByPk(id, {
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }
        ],
        attributes: { include: [[Sequelize.fn(`ROUND`, Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 1), 'avgStarRating']] },
        group: ['Spot.id', 'SpotImages.id', 'Reviews.id', 'Owner.id']

    });

    // let sum = 0;
    // spot.Reviews.forEach(review => sum += review.stars);
    // let avgStarRating = sum / spot.Reviews.length;
    // spot.dataValues.avgStarRating = avgStarRating;

    // delete spot.dataValues.Reviews;

    if (!spot) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
    res.json(spot);
});


//  Query parameter validation errors
const validateQueryInput = [
    check('page')
        .optional()
        .exists({ checkFalsy: true })
        .isInt({ gt: 0 })
        .withMessage("Page must be greater than or equal to 1"),
    check('size')
        .optional()
        .exists({ checkFalsy: true })
        .isInt({ gt: 0 })
        .withMessage("Size must be greater than or equal to 1"),
    check('maxLat')
        .optional()
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage("Maximum latitude is invalid"),
    check('minLat')
        .optional()
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage("Minimum latitude is invalid"),
    check('minLng')
        .optional()
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage("Minimum latitude is invalid"),
    check('maxLng')
        .optional()
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage("Minimum longitude is invalid"),
    check('minPrice')
        .optional()
        .exists({ checkFalsy: true })
        .isFloat({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    check('maxPrice')
        .optional()
        .exists({ checkFalsy: true })
        .isFloat({ max: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
];


// Get all Spots
router.get('/', validateQueryInput, async (req, res, next) => {
    let query = {};
    let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    // check if query has page or size

    if (page || size) {
        page = parseInt(page);
        size = parseInt(size);
        if (!page || page > 10) page = 1;
        if (!size || size > 20) size = 20;
        if (page > 0 && size > 0) {
            query.limit = size;
            query.offset = size * (page - 1);
        }
    }

    const spots = await Spot.findAll({
        raw: true,
        include: [{
            model: Review,
            attributes: []
        }],
        attributes: { include: [[Sequelize.fn(`ROUND`, Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 1), 'avgRating']] },
        group: ['Spot.id'],
        ...query,
        subQuery: false //to remove the subquery generation.
    });

    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i];
        const image = await SpotImage.findAll({
            raw: true,
            where: { [Op.and]: [{ spotId: spot.id }, { preview: true }] }
        });

        if (!image.length) spot.previewImage = [];
        else { spot.previewImage = image[0].url; }
    }
    res.json({
        "Spots": spots,
        page,
        size
    });
});

// Full Lazy loading
// router.get('/', async (req, res, next) => {
//     try {
//         const spots = await Spot.findAll({ raw: true });
//         for (let i = 0; i < spots.length; i++) {
//             const spot = spots[i];

//             const reviews = await Review.findAll({
//                 raw: true,
//                 where: { spotId: spot.id },
//                 attributes: { include: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']] },
//                 group: ['Review.id']
//             });

//             spot.avgRating = reviews.length ? reviews[0].avgRating : null;

//             const image = await SpotImage.findAll({
//                 raw: true,
//                 where: { [Op.and]: [{ spotId: spot.id }, { preview: true }] }
//             });

//             if (!image.length) { spot.previewImage = []; }
//             else { spot.previewImage = image[0]['url']; }
//         }
//         res.json({ "Spots": spots });
//     } catch (e) {
//         console.log(e.message);
//     }
// });


module.exports = router;
