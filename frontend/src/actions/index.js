import axios from 'axios';

import Swal from 'sweetalert2'; 

export function getDogs() {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs"); 
            return dispatch({
                type: "GET_DOGS",
                payload: json.data
            });
        } catch (error) {
            console.log("Error al cargar datos");
        };
    };
};

export function getNameDogs(name) {
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/dogs?name=" + name);
            return dispatch({
                type: "GET_DOGS_NAME",
                payload: json.data
            }); 
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'The dog not found',
            })
            console.log(error);
        };  
    };
};

export function postDog(info) { 
    return async function (dispatch) {
        try {
            const json = axios.post("http://localhost:3001/dog", info);
            return json.data;
        } catch {
            console.log("error");
        };
    };
};

export function getDetailsDogs(id) {
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/dogs/" + id);
            return dispatch({
                type: "GET_DETAILS_DOG",
                payload: json.data
            });
        } catch {
            console.log("ID not found");
        };
    };
};

export function getListTemperaments() { 
    return async function (dispatch) {
        try {
            const json = await axios.get("http://localhost:3001/temperament");
            return dispatch({
                type: "GET_TEMPERAMENTS",
                payload: json.data
            });
        } catch {
            console.log("Error, could not fetch temperaments");
        };
    };
};

export function filterDogsByTemperament(payload) { 
    return {
        type: "FILTER_DOGS_BY_TEMPERAMENT",
        payload
    };
};

export function filterDogsByCreated(value) {
    return {
        type: "FILTER_DOGS_BY_CREATED",
        payload: value
    };
};

export function orderByName(payload) { 
    return {
        type: "ORDER_BY_NAME", 
        payload
    };
};

export function orderByWeight(payload) { 
    return {
        type: "ORDER_BY_WEIGHT", 
        payload
    };
};

export function refreshPag(payload) {
    return {
        type: "REFRESH_PAG",
        payload
    }
};
