const { Router } = require('express');
const router = Router();
const {Temperament} = require('../db');

const getApiInfo = require('../Funciones/Api');

const getTemperaments = async () => {
    const temperaments = [];
    try {
        const allDogs = await getApiInfo();
        allDogs.map(d => {
            d.temperament.forEach(e => {
                if(!temperaments.includes(e)) {
                    temperaments.push(e);
                }
            });
        });
        return temperaments;
    } catch (e) {
        console.log(e);
    }
};



router.get('/', async (req, res) => {
    try {
        const temp = await getTemperaments();
        temp.forEach(t => {
            Temperament.findOrCreate({
                where: {
                    name: t,
                }
            });
        });

        const temperaments = await Temperament.findAll({
            attributes: ['name']
        });
        res.status(200).json(temperaments);

    } catch (e) {
        res.status(500).send('There was a problem in the server', e);
    }
});


module.exports = router;