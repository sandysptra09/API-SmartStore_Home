'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Wishlist', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // relation foreign key
    await queryInterface.addIndex('Wishlist', ['user_id']);
    await queryInterface.addIndex('Wishlist', ['product_id'])

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Wishlist');
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Products')
  }
};