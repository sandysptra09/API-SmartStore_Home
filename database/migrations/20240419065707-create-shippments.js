'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shippments', {
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
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id"
        }
      },
      track_number: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_qty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total_weight: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address1: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      address2: {
        type: Sequelize.TEXT
      },
      phone: {
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        }
      },
      city: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      post_code: {
        type: Sequelize.INTEGER
      },
      shipped_at: {
        type: Sequelize.STRING
      },
      shipped_by: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.addIndex('Shippments', ['user_id']);
    await queryInterface.addIndex('Shippments', ['order_id']);

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Shippments');
    await queryInterface.dropTable('Users');
    await queryInterface.dropTable('Orders');
  }
};
