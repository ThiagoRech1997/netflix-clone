import { ADD_MOVIE_ITEM, GET_MOVIE_FAIL } from './../types/movieTypes'

export const movieItemReducer = (
    state = { movieInfo: {} },
    action
) => {
    switch(action.type){
        case ADD_MOVIE_ITEM:
            return{
                ...state,
                movieInfo: action.payload
            };
        case GET_MOVIE_FAIL:
            return{
                ...state, 
                loading: false, 
                message: action.payload.message
            }
        default:
            return state
    }
}