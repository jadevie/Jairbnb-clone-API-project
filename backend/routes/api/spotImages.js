const express = require('express');
const { Op, sequelize, Sequelize } = require('sequelize');
const { setTokenCookie, requireAuth, requireProperAuthorizationForSpot, authenticateSpotNotOwned } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { use } = require('./reviews');
const { raw } = require('express');
const e = require('express');
const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const id = req.params.imageId;
    const spotImage = await SpotImage.findByPk(id, {
        raw: true,
        nest: true,
        include: {
            model: Spot,
            attributes: ['ownerId']
        }
    });

    if (!spotImage) {
        res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        });
    }
    
    if (spotImage.Spot.ownerId === userId) {
        await SpotImage.destroy({ where: { id } });
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    }
});

module.exports = router;
