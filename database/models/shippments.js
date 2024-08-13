'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shippments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shippments.belongsTo(models.Users, { foreignKey: 'user_id' });
      Shippments.belongsTo(models.Orders, { foreignKey: 'order_id' });
    }
  }
  Shippments.init({
    user_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    track_number: DataTypes.STRING,
    status: DataTypes.STRING,
    total_qty: DataTypes.INTEGER,
    total_weight: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    address1: DataTypes.TEXT,
    address2: DataTypes.TEXT,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    post_code: DataTypes.INTEGER,
    shipped_at: DataTypes.STRING,
    shipped_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shippments',
  });
  return Shippments;
};