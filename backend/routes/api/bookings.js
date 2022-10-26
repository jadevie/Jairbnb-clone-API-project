const express = require('express');
const { Op, sequelize, Sequelize } = require('sequelize');
const { setTokenCookie, requireAuth, requireProperAuthorization, requireProperAuthorizationForReview } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { check, Result } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Get all the bookings from current user
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const bookings = await Booking.findAll({
        raw: true,
        nest: true,
        where: { userId },
        include: {
            model: Spot,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }
    });

    for (let booking of bookings) {
        let spotId = booking.Spot.id;
        const image = await SpotImage.findOne({
            where: {
                [Op.and]: [{ spotId }, { preview: true }]
            }
        });
        booking.Spot.previewImage = image.url;
    }
    res.json({ 'Bookings': bookings });
});

// Follow the order as readme file:
// router.get('/current', requireAuth, async (req, res, next) => {
//     const userId = req.user.id;
//     const bookings = await Booking.findAll({
//         where: { userId },
//         raw: true
//     });
//     let result = [];
//     for (let i = 0; i < bookings.length; i++) {
//         const booking = bookings[i];


//         const spots = await Spot.findOne({
//             where: { onwerId: userId },
//             include: [
//                 {
//                     model: SpotImage,
//                     attributes: [],
//                     required: false
//                 }
//             ],
//             attributes: {
//                 include: [
//                     [Sequelize.col('SpotImages.url'), 'previewImage']]
//             },
//         });

//         let bookingData = {};
//         bookingData.id = booking['id'];
//         bookingData.spotId = booking['spotId'];
//         bookingData.Spot = spots;
//         bookingData.userId = userId;
//         bookingData.startDate = booking["startDate"];
//         bookingData.endDate = booking["endDate"];
//         bookingData.createdAt = booking["createdAt"];
//         bookingData.updatedAt = booking["updatedAt"];

//         result.push(bookingData);

//     }
//     res.json({ 'Bookings': result });
// });

module.exports = router;
