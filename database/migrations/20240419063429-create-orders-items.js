'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders_Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      base_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      base_total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      tax_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      tax_percent: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      discount_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      discount_percent: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      sub_total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      weight: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id"
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id"
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
    await queryInterface.addIndex('Orders_Items', ['order_id']);
    await queryInterface.addIndex('Orders_Items', ['product_id']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders_Items');
    await queryInterface.dropTable('Orders');
    await queryInterface.dropTable('Products');
  }
};