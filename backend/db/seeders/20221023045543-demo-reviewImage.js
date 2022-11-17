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
  },
  {
    "reviewId": 4,
    "url": ""
  },
  {
    "reviewId": 5,
    "url": ""
  },
  {
    "reviewId": 6,
    "url": ""
  },
  {
    "reviewId": 7,
    "url": ""
  },
  {
    "reviewId": 8,
    "url": ""
  },
  {
    "reviewId": 9,
    "url": ""
  },
  {
    "reviewId": 10,
    "url": ""
  },
  {
    "reviewId": 11,
    "url": ""
  },
  {
    "reviewId": 12,
    "url": ""
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
