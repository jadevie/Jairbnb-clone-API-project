'use strict';
const { Op } = require('sequelize');

const spots = [
  {
    "ownerId": 1,
    "address": "123 Disney Lane",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "lat": 37.7645358,
    "lng": -122.4730327,
    "name": "App Academy",
    "description": "Place where web developers are created",
    "price": 250
  },
  {
    "ownerId": 2,
    "address": '23 Tahiti Lane',
    "city": 'Alameda',
    "state": 'CA',
    "country": 'USA',
    "lat": 47.7644558,
    "lng": -245.4567329,
    "name": "Humby",
    "description": "It's peaceful town",
    "price": 280
  },
  {
    "ownerId": 3,
    "address": '456 Gonzalez Dr',
    "city": 'San Francisco',
    "state": 'CA',
    "country": 'USA',
    "lat": 27.7648795,
    "lng": -145.4567562,
    "name": "Aspen",
    "description": "It's a great place to visit",
    "price": 350
  }
];
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', spots);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Spots', { [Op.or]: spots });
  }
};
