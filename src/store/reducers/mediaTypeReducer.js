import { ADD_MEDIA_TYPE } from './../types/movieTypes'

export const mediaTypeReducer = (
    state = { midia: {} },
    action
) => {
    switch(action.type){
        case ADD_MEDIA_TYPE:
            return{
                ...state,
                midia: action.payload
            };
        default:
            return state
    }
}

