'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      payment_due: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      payment_status: {
        type: Sequelize.STRING,
      },
      payment_token: {
        type: Sequelize.STRING
      },
      payment_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      base_total_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      tax_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      tax_percent: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      discount_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      discount_percent: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      shipping_cost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      grand_total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      costumer_first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      costumer_last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      costumer_address1: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      costumer_address2: {
        type: Sequelize.TEXT
      },
      costumer_phone: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      costumer_email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      costumer_city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      costumer_province: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      costumer_postcode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      shipping_courier: {
        type: Sequelize.STRING
      },
      shipping_service_name: {
        type: Sequelize.STRING
      },
      approved_by: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      approved_at: {
        type: Sequelize.DATE
      },
      cancelled_by: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        }
      },
      cancelled_at: {
        type: Sequelize.DATE
      },
      cancellation_note: {
        type: Sequelize.TEXT
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
    await queryInterface.addIndex('Orders', ['user_id']);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
    await queryInterface.dropTable('Users')
  }
};