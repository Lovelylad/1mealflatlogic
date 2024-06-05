const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class RecipesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const recipes = await db.recipes.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        ingredients: data.ingredients || null,
        instructions: data.instructions || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await recipes.setCompanie(data.companie || null, {
      transaction,
    });

    await recipes.setMeal_plans(data.meal_plans || [], {
      transaction,
    });

    return recipes;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const recipesData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      ingredients: item.ingredients || null,
      instructions: item.instructions || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const recipes = await db.recipes.bulkCreate(recipesData, { transaction });

    // For each item created, replace relation files

    return recipes;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const recipes = await db.recipes.findByPk(id, {}, { transaction });

    await recipes.update(
      {
        title: data.title || null,
        ingredients: data.ingredients || null,
        instructions: data.instructions || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await recipes.setCompanie(data.companie || null, {
      transaction,
    });

    await recipes.setMeal_plans(data.meal_plans || [], {
      transaction,
    });

    return recipes;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const recipes = await db.recipes.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of recipes) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of recipes) {
        await record.destroy({ transaction });
      }
    });

    return recipes;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const recipes = await db.recipes.findByPk(id, options);

    await recipes.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await recipes.destroy({
      transaction,
    });

    return recipes;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const recipes = await db.recipes.findOne({ where }, { transaction });

    if (!recipes) {
      return recipes;
    }

    const output = recipes.get({ plain: true });

    output.meal_plans = await recipes.getMeal_plans({
      transaction,
    });

    output.companie = await recipes.getCompanie({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.companies,
        as: 'companie',
      },

      {
        model: db.meal_plans,
        as: 'meal_plans',
        through: filter.meal_plans
          ? {
              where: {
                [Op.or]: filter.meal_plans.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.meal_plans ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('recipes', 'title', filter.title),
        };
      }

      if (filter.ingredients) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('recipes', 'ingredients', filter.ingredients),
        };
      }

      if (filter.instructions) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('recipes', 'instructions', filter.instructions),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.companie) {
        var listItems = filter.companie.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          companieId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.recipes.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.recipes.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('recipes', 'title', query),
        ],
      };
    }

    const records = await db.recipes.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
