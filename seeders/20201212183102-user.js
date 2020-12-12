'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
        firstName: 'Forrest',
        lastName: 'Gump',
        email: 'forrestgump@gmail.com',
        userName: 'theRealForrest',
        createdAt: new Date(),
        updatedAt: new Date()

    }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
