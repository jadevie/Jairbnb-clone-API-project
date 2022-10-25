const express = require('express');
const { Op, sequelize, Sequelize } = require('sequelize');
const { setTokenCookie, requireAuth, requireProperAuthorization } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();




module.exports = router;
