const {Dog, Temperament} = require('../db');

module.exports = getDbInfo = async () => {
    const allDogs = await Dog.findAll({
        include: Temperament,
        attributes: ['id','name', 'weight', 'height', 'image', 'lifeSpan', 'createdInDb'],
    });

    const dogsWithTemps = allDogs.map(dog => {
        const temps = [];
        dog.temperaments.forEach(t => {
            temps.push(t.name);
        });

        return {
            id: dog.id,
            name: dog.name,
            weight: ([dog.weight].join().split(' ').filter(w => w !== '-').map(e => e === 'NaN' ? 0 : parseInt(e, 10))[0] +
                    [dog.weight].join().split(' ').filter(w => w !== '-').map(e => parseInt(e, 10))[1]) / 2,
            height: dog.height,
            image: dog.image,
            temperament: temps,
            lifeSpan: dog.lifeSpan,
            createdInDb: dog.createdInDb
        }
    });

    return dogsWithTemps;
};