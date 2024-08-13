'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Wishlist, { foreignKey: 'user_id' });

      Users.hasMany(models.Cart, { foreignKey: 'user_id' });

      Users.hasMany(models.Reviews, { foreignKey: 'user_id' });

      Users.hasMany(models.Orders, { foreignKey: 'user_id' });

      Users.hasMany(models.Shippments, { foreignKey: 'user_id' });
    }
  }
  Users.init({
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.STRING,
    address1: DataTypes.TEXT,
    address2: DataTypes.TEXT,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    post_code: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};