const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const appointments = sequelize.define(
    'appointments',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      appointment_date: {
        type: DataTypes.DATE,
      },

      notes: {
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

  appointments.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.appointments.belongsTo(db.clients, {
      as: 'client',
      foreignKey: {
        name: 'clientId',
      },
      constraints: false,
    });

    db.appointments.belongsTo(db.nutritionists, {
      as: 'nutritionist',
      foreignKey: {
        name: 'nutritionistId',
      },
      constraints: false,
    });

    db.appointments.belongsTo(db.companies, {
      as: 'companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.appointments.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.appointments.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return appointments;
};
