'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', [{
        title: 'My First Run!',
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        runType: 'Outdoors',
        difficulty: 'Hard',
        comments: 'The run was really hard',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
