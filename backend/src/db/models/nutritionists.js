const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const nutritionists = sequelize.define(
    'nutritionists',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      first_name: {
        type: DataTypes.TEXT,
      },

      last_name: {
        type: DataTypes.TEXT,
      },

      email: {
        type: DataTypes.TEXT,
      },

      phone: {
        type: DataTypes.TEXT,
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

  nutritionists.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.nutritionists.hasMany(db.appointments, {
      as: 'appointments_nutritionist',
      foreignKey: {
        name: 'nutritionistId',
      },
      constraints: false,
    });

    db.nutritionists.hasMany(db.meal_plans, {
      as: 'meal_plans_nutritionist',
      foreignKey: {
        name: 'nutritionistId',
      },
      constraints: false,
    });

    db.nutritionists.hasMany(db.patient_records, {
      as: 'patient_records_nutritionist',
      foreignKey: {
        name: 'nutritionistId',
      },
      constraints: false,
    });

    //end loop

    db.nutritionists.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.nutritionists.belongsTo(db.companies, {
      as: 'companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.nutritionists.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.nutritionists.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return nutritionists;
};
