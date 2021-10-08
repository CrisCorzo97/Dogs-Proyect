const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
}


export default function rootReducer (state=initialState, action) {
     switch(action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

        case 'GET_TEMPS':
            return {
                ...state,
                temperaments: action.payload
            }

        case 'GET_NAME_DOG':
            return {
                ...state,
                dogs: action.payload
            }

        case 'POST_DOG':
            return {
                ...state
            }
        
        case 'FILTER_CREATED':
            const allDogs = state.allDogs;
            const createdDogs = action.payload === 'created' ? allDogs.filter(d => d.createdInDb) : allDogs.filter(d => !d.createdInDb);
            return {
                ...state,
                dogs: action.payload === 'all' ? state.allDogs : createdDogs
            }

        case 'FILTER_BY_TEMP':
            const allDogs2 = state.allDogs;
            const filterByTemp = action.payload === 'all' ? allDogs2 : allDogs2.filter(dog => dog.temperament.includes(action.payload));
            return {
                ...state,
                dogs: filterByTemp
            }

        case 'ORDER':
            const allDogs3 = state.allDogs;

            const order = action.payload === 'none' ? allDogs3 :
                    action.payload === 'asc' ? allDogs3.sort((a, b) => {
                        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        return 0;
                    }) :
                    action.payload === 'desc' ? allDogs3.sort((a, b) => {
                        if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                        if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                        return 0;
                    }) : 
                    action.payload === 'weightAsc' ? allDogs3.sort((a, b) => {
                        return a.weight - b.weight;
                    }) : 
                    action.payload === 'weightDesc' ? allDogs3.sort((a, b) => {
                        return b.weight - a.weight;
                    }) : null;

            return {
                ...state,
                dogs: order
            }
        
        case 'ADD_NEW_DOG':
            return {
                ...state,
                dogs: state.dogs.concat(action.payload)
            }

        case 'REMOVE_DOG':
            return {
                ...state,
                dogs: state.dogs.filter(d => d.id !== action.payload)
            }

        default:
            return state;
     }
};