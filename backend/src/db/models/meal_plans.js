const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const meal_plans = sequelize.define(
    'meal_plans',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      start_date: {
        type: DataTypes.DATE,
      },

      end_date: {
        type: DataTypes.DATE,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  meal_plans.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.meal_plans.belongsTo(db.nutritionists, {
      as: 'nutritionist',
      foreignKey: {
        name: 'nutritionistId',
      },
      constraints: false,
    });

    db.meal_plans.belongsTo(db.clients, {
      as: 'client',
      foreignKey: {
        name: 'clientId',
      },
      constraints: false,
    });

    db.meal_plans.belongsTo(db.companies, {
      as: 'companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.meal_plans.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.meal_plans.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return meal_plans;
};
