'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const brands = [];
    for (let i = 0; i < 5; i++) {
      brands.push({
        brand_name: `employe${i}`,
        slug: `brand${i}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert('Brands', brands, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Brands', null, {
      truncate: true
    });
  }
};