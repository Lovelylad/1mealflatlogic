const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Meal_plansDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const meal_plans = await db.meal_plans.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        description: data.description || null,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await meal_plans.setNutritionist(data.nutritionist || null, {
      transaction,
    });

    await meal_plans.setClient(data.client || null, {
      transaction,
    });

    await meal_plans.setCompanie(data.companie || null, {
      transaction,
    });

    return meal_plans;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const meal_plansData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      description: item.description || null,
      start_date: item.start_date || null,
      end_date: item.end_date || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const meal_plans = await db.meal_plans.bulkCreate(meal_plansData, {
      transaction,
    });

    // For each item created, replace relation files

    return meal_plans;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const meal_plans = await db.meal_plans.findByPk(id, {}, { transaction });

    await meal_plans.update(
      {
        title: data.title || null,
        description: data.description || null,
        start_date: data.start_date || null,
        end_date: data.end_date || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await meal_plans.setNutritionist(data.nutritionist || null, {
      transaction,
    });

    await meal_plans.setClient(data.client || null, {
      transaction,
    });

    await meal_plans.setCompanie(data.companie || null, {
      transaction,
    });

    return meal_plans;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const meal_plans = await db.meal_plans.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of meal_plans) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of meal_plans) {
        await record.destroy({ transaction });
      }
    });

    return meal_plans;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const meal_plans = await db.meal_plans.findByPk(id, options);

    await meal_plans.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await meal_plans.destroy({
      transaction,
    });

    return meal_plans;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const meal_plans = await db.meal_plans.findOne({ where }, { transaction });

    if (!meal_plans) {
      return meal_plans;
    }

    const output = meal_plans.get({ plain: true });

    output.nutritionist = await meal_plans.getNutritionist({
      transaction,
    });

    output.client = await meal_plans.getClient({
      transaction,
    });

    output.companie = await meal_plans.getCompanie({
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
        model: db.nutritionists,
        as: 'nutritionist',
      },

      {
        model: db.clients,
        as: 'client',
      },

      {
        model: db.companies,
        as: 'companie',
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
          [Op.and]: Utils.ilike('meal_plans', 'title', filter.title),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'meal_plans',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              start_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              end_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.start_dateRange) {
        const [start, end] = filter.start_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            start_date: {
              ...where.start_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            start_date: {
              ...where.start_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.end_dateRange) {
        const [start, end] = filter.end_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            end_date: {
              ...where.end_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            end_date: {
              ...where.end_date,
              [Op.lte]: end,
            },
          };
        }
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

      if (filter.nutritionist) {
        var listItems = filter.nutritionist.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          nutritionistId: { [Op.or]: listItems },
        };
      }

      if (filter.client) {
        var listItems = filter.client.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          clientId: { [Op.or]: listItems },
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
          count: await db.meal_plans.count({
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
      : await db.meal_plans.findAndCountAll({
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
          Utils.ilike('meal_plans', 'title', query),
        ],
      };
    }

    const records = await db.meal_plans.findAll({
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
