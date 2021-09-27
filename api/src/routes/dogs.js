const { Router } = require('express');
const router = Router();
const {Dog} = require('../db');

const getAllDogs = require('../Funciones/Todo');


router.get('/', async (req, res) => {
    const {name} = req.query;
    
    if(name) {
        try {
            const info = await getAllDogs();
            const infoName = info.filter(dog => dog.name === name);

            if(infoName.length > 0) {
                const infoPrincipal = infoName.map(m => {
                    return {
                        name: m.name,
                        image: m.image,
                        temperament: m.temperament
                    }
                })
                res.status(200).json(infoPrincipal);
            } else {
                res.send('The dog breed was not found!')
            }
        } catch (e) {
            res.status(500).send('There was a problem in the server', e);
        }
    } else {
        try {
            const info = await getAllDogs();
            const infoPrincipal = info.map(dog => {
                return {
                    name: dog.name,
                    image: dog.image,
                    temperament: dog.temperament
                }
            });
            res.status(200).json(infoPrincipal);
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
                const infoDetails = dogFound.map(dog => {
                    return {
                        name: dog.name,
                        image: dog.image,
                        temperament: dog.temperament,
                        height: dog.height,
                        weight: dog.weight,
                        lifeSpan: dog.lifeSpan
                    }
                })
                return res.status(200).json(infoDetails);
            }
            return res.status(404).send('Dog not found');
        };
    } catch (e) {
        res.status(500).send('There was a problem in the server', e);
    };
});

router.post('/', async (req, res) => {
    const {name, height, weight, lifeSpan, temperament} = req.body;
    try {
        if(!name || !height || !weight) {
            res.status(404).send('The name, height and weight are required')
        } else {
        const createDog = await Dog.create({
            name, 
            height, 
            weight, 
            lifeSpan, 
        });
        await createDog.setTemperament(temperament);
        res.status(200).send('The dog has been successfully created!');
        }
    } catch (e) {
        res.status(500).send('There was a problem in the server', e);
    }
});




module.exports = router;