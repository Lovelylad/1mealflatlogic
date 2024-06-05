const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const clients = sequelize.define(
    'clients',
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

  clients.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.clients.hasMany(db.appointments, {
      as: 'appointments_client',
      foreignKey: {
        name: 'clientId',
      },
      constraints: false,
    });

    db.clients.hasMany(db.meal_plans, {
      as: 'meal_plans_client',
      foreignKey: {
        name: 'clientId',
      },
      constraints: false,
    });

    db.clients.hasMany(db.patient_records, {
      as: 'patient_records_client',
      foreignKey: {
        name: 'clientId',
      },
      constraints: false,
    });

    //end loop

    db.clients.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.clients.belongsTo(db.companies, {
      as: 'companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.clients.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.clients.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return clients;
};
