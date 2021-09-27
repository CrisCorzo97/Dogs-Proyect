const {Dog, Temperament} = require('../db');

module.exports = getDbInfo = async () => {
    return await Dog.findAll({
        include: Temperament,
        attributes: ['name'],
        through: {
            attributes: [],
        }
    });
};