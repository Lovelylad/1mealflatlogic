const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const recipes = sequelize.define(
    'recipes',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      ingredients: {
        type: DataTypes.TEXT,
      },

      instructions: {
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

  recipes.associate = (db) => {
    db.recipes.belongsToMany(db.meal_plans, {
      as: 'meal_plans',
      foreignKey: {
        name: 'recipes_meal_plansId',
      },
      constraints: false,
      through: 'recipesMeal_plansMeal_plans',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.recipes.belongsTo(db.companies, {
      as: 'companie',
      foreignKey: {
        name: 'companieId',
      },
      constraints: false,
    });

    db.recipes.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.recipes.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return recipes;
};
