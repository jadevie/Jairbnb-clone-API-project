const express = require('express');
const { Op, sequelize, Sequelize } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();



// router.post('/', requireAuth, async (req, res, next) => {
//     const { address, city, state, country, lat, lng, name, description, price } = req.body;

//     const newSpot = await Spot.create({
//         address, city, state, country, lat, lng, name, description, price
//     });

//     res.json(newSpot);
// });

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
        attributes: {
            include: [
                [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating']]
        }
    });
    res.json(spot);
});

router.get('/current', requireAuth, async (req, res, next) => {
    const id = req.user.id;

    const spots = await Spot.findByPk(id, {
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: []
            }
        ],
        attributes: {
            include: [
                [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'], [Sequelize.col('SpotImages.url'), 'previewImage']]
        }
    });
    res.json({ "Spots": spots });
});


router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: []
            }
        ],
        attributes: {
            include: [
                [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating'], [Sequelize.col('SpotImages.url'), 'previewImage']]
        }
    });
    res.json({ "Spots": spots });
});


module.exports = router;
