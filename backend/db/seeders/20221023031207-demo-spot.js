'use strict';
const { Op } = require('sequelize');

const spots = [
  {
    "ownerId": 1,
    "address": "3981 Conaway Street",
    "city": "San Francisco",
    "state": "CA",
    "country": "USA",
    "lat": 37.7645358,
    "lng": -122.4730327,
    "name": "Luxurious House w/ Heating + Gym",
    "description": "Stay in this luxurious house and live like a true local in San Francisco. We're within walking distance to restaurants, shops, and parks. Our rental comes with 2 bedrooms, and a gym, hot tub, and kitchen that you're free to use any time. Heating, AC, Wi-Fi -- we've got everything you need.",
    "price": 250
  },
  {
    "ownerId": 1,
    "address": "16 Penn St.",
    "city": "San Francisco",
    "state": "CA",
    "country": "USA",
    "lat": 38.7645358,
    "lng": -124.4730327,
    "name": "Luxurious House w/ Heating + Gym",
    "description": "Want to visit San Francisco without breaking the bank? We have exactly what you're looking for. Our luxurious house comes with 2 bedrooms, gym, hot tub, kitchen, heating, AC, and Wi-Fi, and we're within walking distance to restaurants, shops, and parks.",
    "price": 250
  },
  {
    "ownerId": 1,
    "address": "227 S. Queen St.",
    "city": "San Francisco",
    "state": "CA",
    "country": "USA",
    "lat": 39.7645358,
    "lng": -125.4730327,
    "name": "Luxurious House w/ Heating + Gym",
    "description": "Thinking about visiting San Francisco? I have a 2-bedroom house that will be perfect for your stay. This luxurious rental comes with amenities such as heating, AC, and Wi-Fi. Our gym, hot tub, and kitchen are yours to enjoy, as well. If you want to go to restaurants, shops, and parks, we're within walking distance.",
    "price": 250
  },
  {
    "ownerId": 1,
    "address": "16 State St.",
    "city": "San Francisco",
    "state": "CA",
    "country": "USA",
    "lat": 40.7645358,
    "lng": -126.4730327,
    "name": "Luxurious House w/ Heating + Gym",
    "description": "Restaurants, shops, and parks in San Francisco will make this a vacation to remember, and my luxurious 2-bedroom house comes complete with gym, hot tub, and kitchen. The heating, AC, and Wi-Fi will make you wish you could stay even longer. If you rent my Airbnb, I know you'll have a great stay in San Francisco.",
    "price": 250
  },
  {
    "ownerId": 2,
    "address": '911 North Goldfield Lane',
    "city": 'San Francisco',
    "state": 'CA',
    "country": 'USA',
    "lat": 47.7644558,
    "lng": -245.4567329,
    "name": "Peaceful House w/ Heating + Hot Tub",
    "description": "My peaceful 3-bedroom house has everything you need for your Alameda trip. The unit comes with heating, Wi-Fi, and Netflix. During your stay, you can also enjoy using a convenient hot tub, indoor fireplace, and kitchen. Our Airbnb is within driving distance to several popular restaurants, parks, and beaches. An ideal base to explore Alameda.",
    "price": 280
  },
  {
    "ownerId": 2,
    "address": '239 Lyme Street',
    "city": 'San Francisco',
    "state": 'CA',
    "country": 'USA',
    "lat": 48.7644558,
    "lng": -246.4567329,
    "name": "Peaceful House w/ Heating + Hot Tub",
    "description": "Stay in this peaceful house and live like a true local in Alameda. We're within driving distance to restaurants, parks, and beaches. Our rental comes with 3 bedrooms, and a hot tub, indoor fireplace, and kitchen that you're free to use any time. Heating, Wi-Fi, Netflix -- we've got everything you need.",
    "price": 280
  },
  {
    "ownerId": 2,
    "address": '2 Glenlake Lane',
    "city": 'San Francisco',
    "state": 'CA',
    "country": 'USA',
    "lat": 49.7644558,
    "lng": -247.4567329,
    "name": "Peaceful House w/ Heating + Hot Tub",
    "description": "Want to visit Alameda without breaking the bank? We have exactly what you're looking for. Our peaceful house comes with 3 bedrooms, hot tub, indoor fireplace, kitchen, heating, Wi-Fi, and Netflix, and we're within driving distance to restaurants, parks, and beaches.",
    "price": 280
  },
  {
    "ownerId": 2,
    "address": '943 Clark St.',
    "city": 'San Francisco',
    "state": 'CA',
    "country": 'USA',
    "lat": 50.7644558,
    "lng": -248.4567329,
    "name": "Peaceful House w/ Heating + Hot Tub",
    "description": "Thinking about visiting Alameda? I have a 3-bedroom house that will be perfect for your stay. This peaceful rental comes with amenities such as heating, Wi-Fi, and Netflix. Our hot tub, indoor fireplace, and kitchen are yours to enjoy, as well. If you want to go to restaurants, parks, and beaches, we're within driving distance.",
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
    "name": "Welcoming House w/ Heating + Gym",
    "description": "Want to visit San Francisco without breaking the bank? We have exactly what you're looking for. Our welcoming house comes with 2 bedrooms, gym, indoor fireplace, living room, heating, Wi-Fi, and laptop-friendly workspace, and we're within walking distance to restaurants, bus routes, and coffee shops.",
    "price": 350
  },
  {
    "ownerId": 3,
    "address": '7131 Rockledge Street',
    "city": 'San Francisco',
    "state": 'CA',
    "country": 'USA',
    "lat": 28.7648795,
    "lng": -146.4567562,
    "name": "Welcoming House w/ Heating + Gym",
    "description": "Stay in this welcoming house and live like a true local in San Francisco. We're within walking distance to restaurants, bus routes, and coffee shops. Our rental comes with 2 bedrooms, and a gym, indoor fireplace, and living room that you're free to use any time. Heating, Wi-Fi, laptop-friendly workspace -- we've got everything you need.",
    "price": 350
  },
  {
    "ownerId": 3,
    "address": '117 Sutor Dr.',
    "city": 'San Francisco',
    "state": 'CA',
    "country": 'USA',
    "lat": 29.7648795,
    "lng": -147.4567562,
    "name": "Welcoming House w/ Heating + Gym",
    "description": "My welcoming 2-bedroom house has everything you need for your San Francisco trip. The unit comes with heating, Wi-Fi, and laptop-friendly workspace. During your stay, you can also enjoy using a convenient gym, indoor fireplace, and living room. Our Airbnb is within walking distance to several popular restaurants, bus routes, and coffee shops. An ideal base to explore San Francisco.",
    "price": 350
  },
  {
    "ownerId": 3,
    "address": '91 Pilgrim St.',
    "city": 'San Francisco',
    "state": 'CA',
    "country": 'USA',
    "lat": 30.7648795,
    "lng": -148.4567562,
    "name": "Welcoming House w/ Heating + Gym",
    "description": "Restaurants, bus routes, and coffee shops in San Francisco will make this a vacation to remember, and my welcoming 2-bedroom house comes complete with gym, indoor fireplace, and living room. The heating, Wi-Fi, and laptop-friendly workspace will make you wish you could stay even longer. If you rent my Airbnb, I know you'll have a great stay in San Francisco.",
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
