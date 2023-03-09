const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');
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
