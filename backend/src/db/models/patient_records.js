const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const patient_records = sequelize.define(
    'patient_records',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      blood_work: {
        type: DataTypes.TEXT,
      },

      supplements: {
        type: DataTypes.TEXT,
      },

      weight: {
        type: DataTypes.DECIMAL,
      },

      additional_info: {
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

  patient_records.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.patient_records.belongsTo(db.clients, {
      as: 'client',
      foreignKey: {
        name: 'clientId',
      },
      constraints: false,
    });

    db.patient_records.belongsTo(db.nutritionists, {
      as: 'nutritionist',
      foreignKey: {
        name: 'nutritionistId',
      },
      constraints: false,
    });

    db.patient_records.belongsTo(db.companies, {
      as: 'companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.patient_records.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.patient_records.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return patient_records;
};
