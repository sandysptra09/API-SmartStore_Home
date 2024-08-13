'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here

      Products.hasMany(models.Wishlist, { foreignKey: 'product_id' })

      Products.hasMany(models.Cart, { foreignKey: 'product_id' })

      Products.hasMany(models.Reviews, { foreignKey: 'product_id' })

      Products.belongsTo(models.Brands, { foreignKey: 'brand_id' });
      Products.belongsTo(models.Categories, { foreignKey: 'category_id' });
    }

  }

  Products.init({
    product_name: DataTypes.STRING,
    slug: DataTypes.STRING,
    short_description: DataTypes.STRING,
    description: DataTypes.TEXT,
    how_to_install: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    status: DataTypes.ENUM(['available', 'unavailable'])
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};