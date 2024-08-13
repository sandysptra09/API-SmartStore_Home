'use strict';
const passwordHash = require('password-hash');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [];
    for (let i = 0; i < 5; i++) {
      users.push({
        username: `user${i}`,
        firstname: `user_firstname${i}`,
        lastname: `user_lastname${i}`,
        phone: `${i}`,
        address1: `user_address1${i}`,
        address2: `user_address2${i}`,
        province: `user_province${i}`,
        city: `user_city${i}`,
        post_code: `user_post_code${i}`,
        email: `user${i}@gmail.com`,
        password: passwordHash.generate(`user${i}`),
        createdAt: new Date(),
        updatedAt: new Date()
      }); 
    }
    return queryInterface.bulkInsert('Users', users, {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {
      truncate: true
    });
  }
};