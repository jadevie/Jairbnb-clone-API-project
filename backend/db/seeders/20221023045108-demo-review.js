'use strict';
const { Op } = require('sequelize');

const reviews = [
  {
    "spotId": 1,
    "userId": 3,
    "review": "This was an awesome spot!",
    "stars": 5
  },
  {
    "spotId": 2,
    "userId": 1,
    "review": "It's a great distance to downtown!",
    "stars": 4
  },
  {
    "spotId": 3,
    "userId": 2,
    "review": "Food is not so good and the air condition is not working",
    "stars": 3
  },
];
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', reviews);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', { [Op.or]: reviews });
  }
};
