
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date_birth: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      sex: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // type: {
      //   type: Sequelize.ENUM('administrator', 'common'),
      //   allowNull: false
      // },
      // roles: {
      //   type: Sequelize.ARRAY(Sequelize.STRING),
      //   allowNull: true
      // }
    },
      {
        timestamps: false
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
