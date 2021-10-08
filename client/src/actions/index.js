import axios from 'axios';

export function getDogs() {
    return async (dispatch) => {
        let dogs = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: 'GET_DOGS',
            payload: dogs.data
        })
    }
};

export function getTemps() {
    return async (dispatch) => {
        let temps = await axios.get('http://localhost:3001/temperament');
        return dispatch({
            type: 'GET_TEMPS',
            payload: temps.data
        })
    }
}

export function postDog(payload) {
    return async (dispatch) => {
        let dog = await axios.post('http://localhost:3001/dogs', payload);
        return dog;
    }
}

export function getNameDog(name) {
    return async (dispatch) => {
        try {
            let dog = await axios.get(`http://localhost:3001/dogs?name=${name}`); 
            return dispatch({
                type: 'GET_NAME_DOG',
                payload: dog.data
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function filterByTemp(payload) {
    return {
        type: 'FILTER_BY_TEMP',
        payload
    }
}

export function Order(payload) {
    return {
        type: 'ORDER',
        payload
    }
}

export function addNewDog(dog) {
    return {
        type: 'ADD_NEW_DOG',
        payload: dog
    }
};

export function removeDog(id) {
    return {
        type: 'REMOVE_DOG',
        payload: id
    }
}