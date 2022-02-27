const axios = require('axios'); 
const { Dog, Temperament } = require('../db.js'); 
const { API_KEY } = process.env; 

const getDogsDB = async () => {
    var infoDB = await Dog.findAll({ 
        include: {
            model: Temperament, 
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }  
    });

    return infoDB;
};

const getDogsAPI = async () => {
    const getData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const dataAPI = await getData.data.map(elem => {
        return {
            id: elem.id,
            name: elem.name,
            image: elem.image.url,
            temperament: elem.temperament,
            weight_min: parseInt(elem.weight.metric.slice(0, 2).trim()),
            weight_max: parseInt(elem.weight.metric.slice(4).trim()),
            height_min: parseInt(elem.height.metric.slice(0, 2).trim()),
            height_max: parseInt(elem.height.metric.slice(4).trim()),
            life_span: elem.life_span,
        }; 
    });

    return dataAPI;  
}; 

const getAllDogs = async () => {
    let getInfoDB = await getDogsDB();
    let getInfoAPI = await getDogsAPI();
    let allDogs = await getInfoAPI.concat(getInfoDB);

    return allDogs;
}

module.exports = { 
    getAllDogs, getDogsAPI, getDogsDB
};