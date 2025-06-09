'use strict';
const {
  DataTypes
} = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../../config/database');
const AppError = require('../../utils/appError.js');
const project = require('./project.js');

const user = sequelize.define('User',  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userType: {
      type: DataTypes.ENUM('0', '1', '2'),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'userType cannot be null'
        },
        notEmpty: {
          msg: 'userType cannot be empty'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'firstName cannot be null'
        },
        notEmpty: {
          msg: 'firstName cannot be empty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'lastName cannot be null'
        },
        notEmpty: {
          msg: 'lastName cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email cannot be null'
        },
        notEmpty: {
          msg: 'email cannot be empty'
        },
        isEmail: {
          msg: 'Invalid email id'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull :false,
      validate: {
        notNull: {
          msg: 'password cannot be null'
        },
        notEmpty: {
          msg: 'password cannot be empty'
        }
      }
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if(this.password.length < 7) {
          throw new AppError('Password length must be grate than 7', 400);
        }
        if(value === this.password) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hashPassword);
        } else {
          throw new AppError('Password and confirm password must be the same', 400);
        }
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      type: DataTypes.DATE,
    }
}, {
    paranoid:true,
    freezeTableName: true,
    modelName: 'User'
});

user.hasMany(project, { foreignKey: 'createdBy' });
project.belongsTo(user, { foreignKey: 'createdBy' });

module.exports = user;