'use strict';

const { Op } = require('sequelize');
const reviewImages = [
  {
    "reviewId": 1,
    "url": "image url"
  },
  {
    "reviewId": 2,
    "url": "image url"
  },
  {
    "reviewId": 3,
    "url": "image url"
  }
];
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ReviewImages', reviewImages);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages', { [Op.or]: reviewImages });
  }
};
