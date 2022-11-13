'use strict';
const { Op } = require('sequelize');

const reviews = [
  {
    "spotId": 1,
    "userId": 2,
    "review": "We loved our stay! The room was very clean and extremely comfortable. The shower was downright luxurious. The location was great too.",
    "stars": 5
  },
  {
    "spotId": 2,
    "userId": 2,
    "review": "I loved this place and would most definitely rebook here whenever I'm in the area. Book now you won't regret it.",
    "stars": 4
  },
  {
    "spotId": 3,
    "userId": 2,
    "review": "Enjoyed the place! Would definitely book again!",
    "stars": 5
  },
  {
    "spotId": 4,
    "userId": 2,
    "review": "Love this place hope to visit again .",
    "stars": 5
  },
  {
    "spotId": 5,
    "userId": 3,
    "review": "Very easy check-in and nice quiet location, very satisfied with our stay. Clean and cozy spot.",
    "stars": 5
  },
  {
    "spotId": 6,
    "userId": 3,
    "review": "Nice place to stay. This place has everything which anyone would need for a small vacation. The communication from the host is timely and accurate.",
    "stars": 4
  },
  {
    "spotId": 7,
    "userId": 3,
    "review": "The location is a little out of the way but in a new and quiet development. The host responds very quickly and is very accommodating.",
    "stars": 5
  },
  {
    "spotId": 8,
    "userId": 3,
    "review": "Was a very nice and peaceful area to stay",
    "stars": 5
  },
  {
    "spotId": 9,
    "userId": 1,
    "review": "Very clean space, nicely furnished. The kitchen has everything you need for a simple cooked meal. Bathroom is very well maintained.",
    "stars": 5
  },
  {
    "spotId": 10,
    "userId": 1,
    "review": "Wonderful stay. Very clean with a Responsive host. The house is located in a perfect spot for whatever meetings or events one must attend nearby.",
    "stars": 5
  },
  {
    "spotId": 11,
    "userId": 1,
    "review": "The space was very Clean and cozy. Host went out of their way to make everything easier and more convenient for us! Perfect little retreat! So thankful I found this!",
    "stars": 5
  }, {
    "spotId": 12,
    "userId": 1,
    "review": "Everything was great! Lots of privacy in a quiet and safe neighborhood . The kitchen and bathroom were also very nice! Enjoyed my stay.",
    "stars": 5
  }
];
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', reviews);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', { [Op.or]: reviews });
  }
};
