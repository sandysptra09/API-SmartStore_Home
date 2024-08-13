'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = [];
    for (let i = 0; i < 5; i++) {
      categories.push({
        category_name: `category${i}`,
        slug: `brand${i}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert('Categories', categories, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {
      truncate: true
    });
  }
};