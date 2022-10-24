const express = require('express');
const { Op, sequelize, Sequelize } = require('sequelize');
const { setTokenCookie, requireAuth, requireProperAuthorization } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();




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

        const spot = await Spot.findAll({
            where: {
                ownerId: id
            },
            raw: true,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'description']
            }
        });
        review.Spot = spot;

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
        res.json(newReviewImage);
    }
    catch (e) {
        console.log(e.message);
    }

});

module.exports = router;
