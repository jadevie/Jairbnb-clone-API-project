const express = require('express');
const { Op } = require('sequelize');
const { requireAuth, validateUpdateForBooking } = require('../../utils/auth');
const { Spot, SpotImage, Booking } = require('../../db/models');
const router = express.Router();


// Delete a Booking
router.delete('/:bookingId', requireAuth, validateUpdateForBooking, async (req, res, next) => {
    const userId = req.user.id;
    const id = req.params.bookingId;
    const booking = await Booking.findByPk(id);

    if (booking.userId === userId) {  // Spot must belong to the current user
        if (booking.startDate.setTime() <= new Date().setTime()) {
            res.status(403).json({
                "message": "Bookings that have been started can't be deleted",
                "statusCode": 403
            });
        }
        await booking.destroy();
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    }
    else { throw new Error("Forbidden"); }
});


// Edit a Booking
router.put('/:bookingId', requireAuth, validateUpdateForBooking, async (req, res, next) => {
    const id = req.params.bookingId;
    const { startDate, endDate } = req.body;

    const bookingRequest = await Booking.findByPk(id);
    const bookingList = await Booking.findAll({ where: { spotId: bookingRequest.spotId }, raw: true });

    for (let booking of bookingList) {
        // Can't edit booking that past end date
        if (new Date(endDate).getTime() < new Date().getTime()) {
            res.status(403).json({
                "message": "Past bookings can't be modified",
                "statusCode": 403
            });
        }
        // Body validation errors:
        if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
            res.status(400).json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": {
                    "endDate": "endDate cannot come before startDate"
                }
            });
        }

        let startDateInput = new Date(startDate);
        let endDateInput = new Date(endDate);
        let startDateBookingString = new Date(booking.startDate);
        let endDateBookingString = new Date(booking.endDate);

        // booking example: 11/20-11/25 / only available before 20 && after 25
        // only compare other user's booking timeline
        if (booking.id !== +id) {
            if (!(startDateInput.getTime() >= endDateBookingString.getTime() ||
                endDateInput.getTime() <= startDateBookingString.getTime())) {
                return res.status(403).json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "statusCode": 403,
                    "errors": {
                        "startDate": "Start date conflicts with an existing booking",
                        "endDate": "End date conflicts with an existing booking"
                    }
                });
            }
        }
    }
    bookingRequest.startDate = startDate;
    bookingRequest.endDate = endDate;
    await bookingRequest.save();
    return res.json(bookingRequest);
});


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
        if (image) booking.Spot.previewImage = image.url;
        else booking.Spot.previewImage = null;
    }
    res.json({ 'Bookings': bookings });
});


module.exports = router;
