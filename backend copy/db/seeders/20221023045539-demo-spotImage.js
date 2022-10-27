'use strict';
const { Op } = require('sequelize');

const images = [
  {
    "spotId": 1,
    "url": "image url",
    "preview": true
  },
  {
    "spotId": 2,
    "url": "image url",
    "preview": false
  },
  {
    "spotId": 3,
    "url": "image url",
    "preview": false
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', images);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', { [Op.or]: images });
  }
};
