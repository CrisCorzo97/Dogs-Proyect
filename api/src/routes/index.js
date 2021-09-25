const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const dogs = require('./dogs');
const temperament = require('./temperament');
const {Dog, Temperament} = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=0f904c1a-e758-4fb7-a17d-c27a6e08102d`);
    const apiInfo = await apiUrl.data.map(d => {
        return {
            name: d.name,
            weight: d.weight.metric,
            height: d.height.metric,
            image: d.image.url,
            temperament: d.temperament,
            lifeSpan: d.life_Span
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {
    return await Dog.findAll({
        include: Temperament,
        attributes: ['name'],
        through: {
            attributes: [],
        }
    });
};

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.use('/dogs', dogs);
router.use('/temperament', temperament);



module.exports = router;
