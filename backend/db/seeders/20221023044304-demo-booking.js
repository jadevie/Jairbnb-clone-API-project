'use strict';
const { Op } = require('sequelize');

const bookings = [
  {
    "spotId": 1,
    "userId": 2,
    "startDate": "2021-01-19",
    "endDate": "2021-01-20"
  },
  {
    "spotId": 2,
    "userId": 2,
    "startDate": "2022-02-19",
    "endDate": "2022-02-30"
  },
  {
    "spotId": 3,
    "userId": 2,
    "startDate": "2022-03-10",
    "endDate": "2022-03-20"
  },
  {
    "spotId": 4,
    "userId": 2,
    "startDate": "2022-04-10",
    "endDate": "2022-12-20"
  },
  {
    "spotId": 5,
    "userId": 3,
    "startDate": "2022-05-10",
    "endDate": "2022-05-20"
  },
  {
    "spotId": 6,
    "userId": 3,
    "startDate": "2022-06-10",
    "endDate": "2022-06-20"
  },
  {
    "spotId": 7,
    "userId": 3,
    "startDate": "2022-07-10",
    "endDate": "2022-07-20"
  },
  {
    "spotId": 8,
    "userId": 3,
    "startDate": "2022-08-10",
    "endDate": "2022-08-20"
  },
  {
    "spotId": 9,
    "userId": 1,
    "startDate": "2022-09-10",
    "endDate": "2022-09-20"
  },
  {
    "spotId": 10,
    "userId": 1,
    "startDate": "2022-10-10",
    "endDate": "2022-10-20"
  },
  {
    "spotId": 11,
    "userId": 3,
    "startDate": "2022-11-10",
    "endDate": "2022-11-20"
  },
  {
    "spotId": 12,
    "userId": 3,
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
