'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payments.belongsTo(models.Orders, { foreignKey: 'order_id' });
    }
  }
  Payments.init({
    order_id: DataTypes.INTEGER,
    number: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    method: DataTypes.STRING,
    status: DataTypes.STRING,
    token: DataTypes.STRING,
    payloads: DataTypes.STRING,
    payment_type: DataTypes.STRING,
    va_number: DataTypes.STRING,
    vendor_name: DataTypes.STRING,
    biller_code: DataTypes.STRING,
    biller_key: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Payments',
  });
  return Payments;
};