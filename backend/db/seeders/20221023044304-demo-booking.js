'use strict';
const { Op } = require('sequelize');

const bookings = [
  {
    "spotId": 1,
    "userId": 2,
    "startDate": "2021-11-19",
    "endDate": "2021-11-20"
  },
  {
    "spotId": 2,
    "userId": 1,
    "startDate": "2022-11-19",
    "endDate": "2022-11-30"
  },
  {
    "spotId": 3,
    "userId": 2,
    "startDate": "2022-12-10",
    "endDate": "2022-12-20"
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
