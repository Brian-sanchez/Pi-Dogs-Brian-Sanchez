const express = require('express'); 
const router = express.Router();
router.use(express.json());
const axios = require('axios');
const { Dog, Temperament } = require("../db.js");
const { getAllDogs, getDogsAPI } = require("./Controllers");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//----------------------------------------------------------------- RUTAS ----------------------------------------------------------------
router.get("/dogs", async (req, res) => {
    const { name } = req.query; 
    try {
        let foundDog = await getAllDogs(); 
        if (name) {
            const dog = foundDog.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase())); // El método toLowerCase() devuelve el valor en minúsculas de la cadena que realiza la llamada.
            if (dog.length > 0) {
                res.status(200).json(dog);
            } else {
                res.status(404).send("Dog not found with this name");
            }
        } else {
            res.status(200).json(foundDog);
        }
    } catch (error) {
        res.status(404).json(error);
    }
});

router.get("/dogs/:idRaza", async (req, res) => {
    const { idRaza } = req.params;
    try {
        let dogId = await getAllDogs();
        if (dogId) {
            let foundDogId = await dogId.filter(dog => dog.id == idRaza); 
            foundDogId.length ?
                res.status(200).json(foundDogId) :
                res.status(404).send("Dog Id not existing");
        } else {
            res.status(404).send("Not found");
        }
    } catch (error) {
        res.status(404).send(error);
    }
});

router.get("/temperament", async (req, res) => {
    try {
        const dataAPI = await getDogsAPI();
        const temperaments = dataAPI.map(elem => { 
            return elem.temperament;
        });
        const eachTemp = temperaments.toString().split(/\s*,\s*/).filter(e => e !== ''); 
        for (elem of eachTemp) {
            Temperament.findOrCreate({ 
                where: {
                    name: elem,
                }
            });
        };

        const allTemperaments = await Temperament.findAll({ 
            order: [
                ["name", "ASC"]
            ]
        });
        res.status(200).send(allTemperaments);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.post("/dog", async (req, res) => {
    let { name, height_min, height_max, weight_min, weight_max, life_span, createInBd, temperament, image } = req.body; 
    if (!image) { 
        try {
            image = "https://t3.ftcdn.net/jpg/03/35/13/14/360_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg";
        } catch (error) {
            console.log(error)
        }
    };
    
    if (name && height_min && height_max && weight_min && weight_max && life_span && temperament && image) {
        let dogsCreate = await Dog.create({
            name: name,
            height_min: parseInt(height_min), 
            height_max: parseInt(height_max),
            weight_min: parseInt(weight_min),
            weight_max: parseInt(weight_max),
            life_span: life_span,
            image: image,
            createInBd: createInBd,
        });
        
        let findTemperamentDB = await Temperament.findAll({ where: { name: temperament } });
        dogsCreate.addTemperament(findTemperamentDB);
        res.status(200).send(dogsCreate);
    } else {
        res.status(404).send("Please, complete all the fields");
    }
});

module.exports = router;
