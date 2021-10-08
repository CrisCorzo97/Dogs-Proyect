const { Router } = require('express');
const router = Router();
const {Dog, Temperament} = require('../db');

const getAllDogs = require('../Funciones/Todo');


router.get('/', async (req, res) => {
    const {name} = req.query;
    
    if(name) {
        try {
            const info = await getAllDogs();
            const infoName = info.filter(dog => dog.name.toLowerCase().includes(name.toString().toLowerCase()));

            if(infoName.length > 0) {
                res.status(200).json(infoName);
            } else {
                res.send('The dog breed was not found!')
            }
        } catch (e) {
            res.status(500).send('There was a problem in the server', e);
        }
    } else {
        try {
            const info = await getAllDogs();
            res.status(200).json(info);
        } catch (e) {
            res.status(500).send('There was a problem in the server', e);
        }
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        if(id) {
            const dogs = await getAllDogs();
            const dogFound = dogs.filter(dog => dog.id == id);

            if(dogFound.length > 0) {
                return res.status(200).json(dogFound);
            } else {
                return res.status(404).send('Dog not found');
            }
        };
    } catch (e) {
        res.status(500).send('There was a problem in the server', e);
    };
});


async function addTemperaments (t, d) {
    const [temp, created] = await Temperament.findOrCreate({
        where: {
            name: t
        }
    }); 

    await d.addTemperament(temp); //vincula el perro con el temperamento
};


router.post('/', async (req, res) => {
    const {name, height, weight, image, lifeSpan, temperament} = req.body;
    if(!name || !height || !weight || !image) {
        res.status(404).send('The name, height, weight and image are required')
    }
    try {
        const dog = await Dog.create({
            name: name, 
            height: height,
            weight: weight,
            image: image,
            lifeSpan: lifeSpan,
        });
        const dogWithOut = {
            name: name, 
            height: height,
            weight: weight,
            image: image,
            lifeSpan: lifeSpan,
        }

        if(temperament) {
            temperament.forEach(t => {
                addTemperaments(t, dog);
            });
            
            const dogCreated = {
                name: name,
                weight: weight,
                height: height,
                image: image,
                temperament: temperament,
                lifeSpan: lifeSpan,
            }

            return res.status(200).json(dogCreated);
        } else {
            res.status(200).json(dogWithOut);
        }
    } catch (e) {
        res.status(500).send('There was a problem in the server', e);
    }
});




module.exports = router;