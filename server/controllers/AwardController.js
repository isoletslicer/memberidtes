const { Award } = require("../models")
const { Op } = require('sequelize')

class AwardController {
    static async getAward(req, res, next) {

        try {
            const data = await Award.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getAwardPaginated(req, res, next) {
        try {

            let userId = req.userLogged.id

            if (!userId) {
                throw {
                    name: `forbidden to access`
                }
            }
            //? rumus kopas dari https://www.bezkoder.com/node-js-sequelize-pagination-mysql/
            const getPagination = (page, size) => {
                const limit = size ? +size : 8;
                const offset = page ? page * limit : 0;
                return { limit, offset };
            };

            const getPagingData = (data, page, limit) => {
                const { count: totalItems, rows: Award } = data;
                const currentPage = page ? +page : 0;
                const totalPages = Math.ceil(totalItems / limit);
                return { totalItems, Award, totalPages, currentPage };
            };

            // filter by name
            const type = req.query.type;
            const point = +req.query.point;
            console.log(type, `<< ini tipe`);
            const { page, size } = req.query;

            const { limit, offset } = getPagination(page, size);

            const option = {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                order: [["id", "ASC"]],
                limit,
                offset
            };
            // query type
            if (type) {
                let splitted = type.split(',')
                let tampungType = []
                splitted.forEach(split => {
                    tampungType.push({ type: split })
                })
                option.where = {
                    ...option.where,
                    [Op.or]: tampungType
                }
            }
            // query point
            if (point) {
                option.where = {
                    ...option.where,
                    point: {
                        [Op.gte]: point
                    }
                }
            }

            const dataAllAwardsGained = await Award.findAndCountAll(option);
            const dataPaginated = getPagingData(dataAllAwardsGained, page, limit);
            // console.log(dataPaginated)
            res.status(200).json(dataPaginated);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

module.exports = AwardController;