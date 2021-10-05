const {Dog, Temperament} = require('../db');

module.exports = getDbInfo = async () => {
    const allDogs = await Dog.findAll({
        include: Temperament,
        attributes: ['id','name', 'height', 'weight', 'lifeSpan', 'createdInDb'],
    });

    const dogsWithTemps = allDogs.map(dog => {
        const temps = [];
        dog.temperaments.forEach(t => {
            temps.push(t.name);
        });

        return {
            id: dog.id,
            name: dog.name,
            weight: dog.weight,
            height: dog.height,
            image: dog.image,
            temperament: temps,
            lifeSpan: dog.lifeSpan,
        }
    });

    return dogsWithTemps;
};