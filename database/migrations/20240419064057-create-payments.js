'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id"
        }
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      method: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.STRING
      },
      payloads: {
        type: Sequelize.STRING
      },
      payment_type: {
        type: Sequelize.STRING
      },
      va_number: {
        type: Sequelize.STRING
      },
      vendor_name: {
        type: Sequelize.STRING
      },
      biller_code: {
        type: Sequelize.STRING
      },
      biller_key: {
        type: Sequelize.STRING
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
    await queryInterface.addIndex('Payments', ['order_id'])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Payments');
    await queryInterface.dropTable('Orders');
  }
};