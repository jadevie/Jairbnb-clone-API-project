const express = require('express');
const { Op, sequelize, Sequelize } = require('sequelize');
const { setTokenCookie, requireAuth, requireProperAuthorization, requireProperAuthorizationForReview } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const id = req.params.imageId;
    const reviewImage = await ReviewImage.findByPk(id, {
        raw: true,
        nest: true,
        include: {
            model: Review,
            attributes: ['userId']
        }
    });

    if (!reviewImage) {
        res.status(404).json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        });
    }

    if (reviewImage.Review.userId === userId) {
        await ReviewImage.destroy({ where: { id } });
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    }
    if (!reviewImage) {
        res.status(404).json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        });
    }
});

module.exports = router;
