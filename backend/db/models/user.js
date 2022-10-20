'use strict';
const { Model, Validator } = require('sequelize');
//bcryptjs package to compare the password and the hashedPassword
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    //Define an instance method toSafeObject to return an object with only the User instance information that is safe to save to a JWT
    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    }

    // Define an instance method to check if there is a match with the User instance's hashedPassword.;
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    // Define a static method getCurrentUserById to return a User with that id.
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    // Define a static method login to search for one User with the specified credential (either a username or an email). If a user is found, then the method should validate the password by passing it into the instance's .validatePassword method. If the password is valid, then the method should return the user by using the currentUser scope.
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    // Define a static method signup to return the created user using the currentUser scope.
    static async signup({ username, email, password }) {
      // Hash the password using the bcryptjs package's hashSync method
      const hashedPassword = bcrypt.hashSync(password);
      // Create a User with the username, email, and hashedPassword
      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'updatedAt', 'email', 'createdAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
