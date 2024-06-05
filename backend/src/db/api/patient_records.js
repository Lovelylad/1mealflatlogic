const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Patient_recordsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const patient_records = await db.patient_records.create(
      {
        id: data.id || undefined,

        blood_work: data.blood_work || null,
        supplements: data.supplements || null,
        weight: data.weight || null,
        additional_info: data.additional_info || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await patient_records.setClient(data.client || null, {
      transaction,
    });

    await patient_records.setNutritionist(data.nutritionist || null, {
      transaction,
    });

    await patient_records.setCompanie(data.companie || null, {
      transaction,
    });

    return patient_records;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const patient_recordsData = data.map((item, index) => ({
      id: item.id || undefined,

      blood_work: item.blood_work || null,
      supplements: item.supplements || null,
      weight: item.weight || null,
      additional_info: item.additional_info || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const patient_records = await db.patient_records.bulkCreate(
      patient_recordsData,
      { transaction },
    );

    // For each item created, replace relation files

    return patient_records;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const patient_records = await db.patient_records.findByPk(
      id,
      {},
      { transaction },
    );

    await patient_records.update(
      {
        blood_work: data.blood_work || null,
        supplements: data.supplements || null,
        weight: data.weight || null,
        additional_info: data.additional_info || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await patient_records.setClient(data.client || null, {
      transaction,
    });

    await patient_records.setNutritionist(data.nutritionist || null, {
      transaction,
    });

    await patient_records.setCompanie(data.companie || null, {
      transaction,
    });

    return patient_records;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const patient_records = await db.patient_records.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of patient_records) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of patient_records) {
        await record.destroy({ transaction });
      }
    });

    return patient_records;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const patient_records = await db.patient_records.findByPk(id, options);

    await patient_records.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await patient_records.destroy({
      transaction,
    });

    return patient_records;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const patient_records = await db.patient_records.findOne(
      { where },
      { transaction },
    );

    if (!patient_records) {
      return patient_records;
    }

    const output = patient_records.get({ plain: true });

    output.client = await patient_records.getClient({
      transaction,
    });

    output.nutritionist = await patient_records.getNutritionist({
      transaction,
    });

    output.companie = await patient_records.getCompanie({
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
        model: db.clients,
        as: 'client',
      },

      {
        model: db.nutritionists,
        as: 'nutritionist',
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

      if (filter.blood_work) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'patient_records',
            'blood_work',
            filter.blood_work,
          ),
        };
      }

      if (filter.supplements) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'patient_records',
            'supplements',
            filter.supplements,
          ),
        };
      }

      if (filter.additional_info) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'patient_records',
            'additional_info',
            filter.additional_info,
          ),
        };
      }

      if (filter.weightRange) {
        const [start, end] = filter.weightRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            weight: {
              ...where.weight,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            weight: {
              ...where.weight,
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

      if (filter.client) {
        var listItems = filter.client.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          clientId: { [Op.or]: listItems },
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
          count: await db.patient_records.count({
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
      : await db.patient_records.findAndCountAll({
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
          Utils.ilike('patient_records', 'client', query),
        ],
      };
    }

    const records = await db.patient_records.findAll({
      attributes: ['id', 'client'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['client', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.client,
    }));
  }
};
