'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reviews.belongsTo(models.Users, { foreignKey: 'user_id' });
      Reviews.belongsTo(models.Products, { foreignKey: 'product_id' })
    }
  }
  Reviews.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    review_title: DataTypes.STRING,
    review: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};