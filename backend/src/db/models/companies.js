const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const companies = sequelize.define(
    'companies',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
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

  companies.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.companies.hasMany(db.users, {
      as: 'users_companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.appointments, {
      as: 'appointments_companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.clients, {
      as: 'clients_companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.courses, {
      as: 'courses_companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.ebooks, {
      as: 'ebooks_companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.meal_plans, {
      as: 'meal_plans_companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.nutritionists, {
      as: 'nutritionists_companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.patient_records, {
      as: 'patient_records_companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.programs, {
      as: 'programs_companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.recipes, {
      as: 'recipes_companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.companies.hasMany(db.diet_restrictions, {
      as: 'diet_restrictions_diet_restrictions',
      foreignKey: {
        name: 'diet_restrictionsId',
      },
      constraints: false,
    });

    //end loop

    db.companies.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.companies.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return companies;
};
