'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = [];
    for (let i = 2; i < 5; i++) {
      products.push({
        product_name: `product${i}`,
        slug: `slug_product${i}`,
        short_description: `short_description${i}`,
        description: `description${i}`,
        how_to_install: `how_to_install${i}`,
        price: 1000 + i,
        stock: 50 + i * 10,
        weight: 20 + i,
        brand_id: i + 1,
        category_id: i + 1,
        image_url: `image_url${i}`,
        status: (i % 2 === 0) ? 'available' : 'unavailable', // Menetapkan status bergantian
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {
      truncate: true
    });
  }
};
