'use strict';
const { Op } = require('sequelize');

const bookings = [
  {
    "spotId": 1,
    "userId": 3,
    "startDate": "2023-11-20",
    "endDate": "2023-11-30"
  },
  {
    "spotId": 2,
    "userId": 1,
    "startDate": "2023-11-20",
    "endDate": "2023-11-30"
  },
  {
    "spotId": 3,
    "userId": 2,
    "startDate": "2023-11-20",
    "endDate": "2023-11-30"
  }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Bookings', bookings);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', { [Op.or]: bookings });
  }
};
