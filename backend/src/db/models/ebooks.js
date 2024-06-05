const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const ebooks = sequelize.define(
    'ebooks',
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

      price: {
        type: DataTypes.DECIMAL,
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

  ebooks.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.ebooks.belongsTo(db.companies, {
      as: 'companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.ebooks.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.ebooks.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return ebooks;
};
