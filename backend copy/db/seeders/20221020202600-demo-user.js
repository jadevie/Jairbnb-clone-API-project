'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: "Jade",
        lastName: "Tran",
        username: 'demo',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'demo@user.io'
      },
      {
        firstName: "Miki",
        lastName: "Bird",
        username: 'user1',
        hashedPassword: bcrypt.hashSync('password2'),
        email: 'user1@user.io'
      },
      {
        firstName: "Mystix",
        lastName: "Rab",
        username: 'user2',
        hashedPassword: bcrypt.hashSync('password3'),
        email: 'user2@user.io'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
