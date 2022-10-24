const express = require('express');
const { Op, sequelize, Sequelize } = require('sequelize');
const { setTokenCookie, requireAuth, requireProperAuthorization } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    const id = req.user.id;
    // const reviews = await Review.findAll({
    //     where: { userId: id },
    //     include: [
    //         {
    //             model: User,
    //             attributes: ['id', 'firstName', 'lastName']
    //         },
    //         {
    //             model: Spot,
    //             include: [{
    //                 model: SpotImage,
    //                 attributes: []
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

    //trial 2
    // const spot = await Spot.findByPk(id, {
    //     include: [
    //         {
    //             model: SpotImage,
    //             attributes: []
    //         }
    //     ],
    //     attributes: {
    //         include: [
    //             [Sequelize.col('SpotImages.url'), 'previewImage']],
    //         exclude: ['createdAt', 'updatedAt', 'description']
    //     }
    // });
    // const spots = await spot.toJSON();
    // console.log(spots);

    // const reviews = await Review.findAll({
    //     where: { userId: id },
    //     include: [
    //         {
    //             model: User,
    //             attributes: ['id', 'firstName', 'lastName']
    //         },
    //         {
    //             model: ReviewImage,
    //             attributes: {
    //                 exclude: ['createdAt', 'updatedAt', 'reviewId']
    //             }
    //         }
    //     ]
    // });
    // console.log(reviews);
    // const review = await reviews.toJSON();
    // review.Spot = spots;

    //trial 3
    const reviews = await Review.findAll({
        raw: true,
        nest: true,
        where: { userId: id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                include: [{
                    model: SpotImage
                }],
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                }
            },
            {
                model: ReviewImage,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'reviewId']
                }
            }
        ]
    });

    const value = reviews[0].Spot.SpotImages.url; // image url

    reviews[0]['Spot']['previewImage'] = value; // assign for new pair

    delete reviews[0]['Spot']["SpotImages"];

    res.json({ "Reviews": reviews });
});

module.exports = router;
