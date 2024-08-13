'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Orders.hasMany(models.Payments, { foreignKey: 'order_id' });

      Orders.hasMany(models.Shippments, { foreignKey: 'order_id' })


      Orders.belongsTo(models.Users, { foreignKey: 'user_id' });
    }
  }
  Orders.init({
    user_id: DataTypes.INTEGER,
    code: DataTypes.STRING,
    status: DataTypes.STRING,
    order_date: DataTypes.DATE,
    payment_due: DataTypes.DATE,
    payment_status: DataTypes.STRING,
    payment_token: DataTypes.STRING,
    payment_url: DataTypes.STRING,
    base_total_price: DataTypes.DECIMAL,
    tax_amount: DataTypes.DECIMAL,
    tax_percent: DataTypes.DECIMAL,
    discount_amount: DataTypes.DECIMAL,
    discount_percent: DataTypes.DECIMAL,
    shipping_cost: DataTypes.DECIMAL,
    grand_total: DataTypes.DECIMAL,
    note: DataTypes.STRING,
    costumer_first_name: DataTypes.STRING,
    costumer_last_name: DataTypes.STRING,
    costumer_address1: DataTypes.TEXT,
    costumer_address2: DataTypes.TEXT,
    costumer_phone: DataTypes.INTEGER,
    costumer_email: DataTypes.STRING,
    costumer_city: DataTypes.STRING,
    costumer_province: DataTypes.STRING,
    costumer_postcode: DataTypes.INTEGER,
    shipping_courier: DataTypes.STRING,
    shipping_service_name: DataTypes.STRING,
    approved_by: DataTypes.INTEGER,
    approved_at: DataTypes.DATE,
    cancelled_by: DataTypes.INTEGER,
    cancelled_at: DataTypes.DATE,
    cancellation_note: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};