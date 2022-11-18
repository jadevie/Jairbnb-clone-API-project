'use strict';
const { Op } = require('sequelize');

const images = [
  {
    "spotId": 1,
    "url": "https://images.pexels.com/photos/5997994/pexels-photo-5997994.jpeg",
    "preview": true
  },
  {
    "spotId": 1,
    "url": "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    "preview": false
  },
  {
    "spotId": 1,
    "url": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg",
    "preview": false
  },
  {
    "spotId": 1,
    "url": "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg",
    "preview": false
  },
  {
    "spotId": 1,
    "url": "https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg",
    "preview": false
  },
  {
    "spotId": 2,
    "url": "https://images.pexels.com/photos/4450329/pexels-photo-4450329.jpeg",
    "preview": true
  },
  {
    "spotId": 2,
    "url": "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    "preview": false
  },
  {
    "spotId": 2,
    "url": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg",
    "preview": false
  },
  {
    "spotId": 2,
    "url": "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg",
    "preview": false
  },
  {
    "spotId": 2,
    "url": "https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg",
    "preview": false
  },
  {
    "spotId": 3,
    "url": "https://images.pexels.com/photos/8134849/pexels-photo-8134849.jpeg",
    "preview": true
  },
  {
    "spotId": 3,
    "url": "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    "preview": false
  },
  {
    "spotId": 3,
    "url": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg",
    "preview": false
  },
  {
    "spotId": 3,
    "url": "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg",
    "preview": false
  },
  {
    "spotId": 3,
    "url": "https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg",
    "preview": false
  },
  {
    "spotId": 4,
    "url": "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    "preview": true
  },
  {
    "spotId": 4,
    "url": "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    "preview": false
  },
  {
    "spotId": 4,
    "url": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg",
    "preview": false
  },
  {
    "spotId": 4,
    "url": "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg",
    "preview": false
  },
  {
    "spotId": 4,
    "url": "https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg",
    "preview": false
  },
  {
    "spotId": 5,
    "url": "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg",
    "preview": true
  },
  {
    "spotId": 5,
    "url": "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    "preview": false
  },
  {
    "spotId": 5,
    "url": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg",
    "preview": false
  },
  {
    "spotId": 5,
    "url": "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg",
    "preview": false
  },
  {
    "spotId": 5,
    "url": "https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg",
    "preview": false
  },
  {
    "spotId": 6,
    "url": "https://images.pexels.com/photos/262405/pexels-photo-262405.jpeg",
    "preview": true
  },
  {
    "spotId": 6,
    "url": "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    "preview": false
  },
  {
    "spotId": 6,
    "url": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg",
    "preview": false
  },
  {
    "spotId": 6,
    "url": "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg",
    "preview": false
  },
  {
    "spotId": 6,
    "url": "https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg",
    "preview": false
  },
  {
    "spotId": 7,
    "url": "https://images.pexels.com/photos/2416472/pexels-photo-2416472.jpeg",
    "preview": true
  },
  {
    "spotId": 7,
    "url": "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    "preview": false
  },
  {
    "spotId": 7,
    "url": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg",
    "preview": false
  },
  {
    "spotId": 7,
    "url": "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg",
    "preview": false
  },
  {
    "spotId": 7,
    "url": "https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg",
    "preview": false
  },
  {
    "spotId": 8,
    "url": "https://images.pexels.com/photos/159869/farmhouse-summer-holiday-holiday-summer-159869.jpeg",
    "preview": true
  },
  {
    "spotId": 8,
    "url": "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    "preview": false
  },
  {
    "spotId": 8,
    "url": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg",
    "preview": false
  },
  {
    "spotId": 8,
    "url": "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg",
    "preview": false
  },
  {
    "spotId": 8,
    "url": "https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg",
    "preview": false
  },
  {
    "spotId": 9,
    "url": "https://images.pexels.com/photos/210558/pexels-photo-210558.jpeg",
    "preview": true
  },
  {
    "spotId": 9,
    "url": "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    "preview": false
  },
  {
    "spotId": 9,
    "url": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg",
    "preview": false
  },
  {
    "spotId": 9,
    "url": "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg",
    "preview": false
  },
  {
    "spotId": 9,
    "url": "https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg",
    "preview": false
  },
  {
    "spotId": 10,
    "url": "https://images.pexels.com/photos/2259917/pexels-photo-2259917.jpeg",
    "preview": true
  },
  {
    "spotId": 10,
    "url": "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    "preview": false
  },
  {
    "spotId": 10,
    "url": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg",
    "preview": false
  },
  {
    "spotId": 10,
    "url": "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg",
    "preview": false
  },
  {
    "spotId": 10,
    "url": "https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg",
    "preview": false
  },
  {
    "spotId": 11,
    "url": "https://images.pexels.com/photos/208321/pexels-photo-208321.jpeg",
    "preview": true
  },
  {
    "spotId": 11,
    "url": "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    "preview": false
  },
  {
    "spotId": 11,
    "url": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg",
    "preview": false
  },
  {
    "spotId": 11,
    "url": "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg",
    "preview": false
  },
  {
    "spotId": 11,
    "url": "https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg",
    "preview": false
  },
  {
    "spotId": 12,
    "url": "https://images.pexels.com/photos/711935/pexels-photo-711935.jpeg",
    "preview": true
  }
   {
    "spotId": 12,
    "url": "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    "preview": false
  },
  {
    "spotId": 12,
    "url": "https://images.pexels.com/photos/462235/pexels-photo-462235.jpeg",
    "preview": false
  },
  {
    "spotId": 12,
    "url": "https://images.pexels.com/photos/342800/pexels-photo-342800.jpeg",
    "preview": false
  },
  {
    "spotId": 12,
    "url": "https://images.pexels.com/photos/2249959/pexels-photo-2249959.jpeg",
    "preview": false
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SpotImages', images);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', { [Op.or]: images });
  }
};
