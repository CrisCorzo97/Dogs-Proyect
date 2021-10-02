const initialState = {
    dogs: [],
}


export default function rootReducer (state=initialState, action) {
     switch(action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
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