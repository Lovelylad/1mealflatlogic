const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const diet_restrictions = sequelize.define(
    'diet_restrictions',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  diet_restrictions.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.diet_restrictions.belongsTo(db.companies, {
      as: 'diet_restrictions',
      foreignKey: {
        name: 'diet_restrictionsId',
      },
      constraints: false,
    });

    db.diet_restrictions.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.diet_restrictions.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return diet_restrictions;
};
