import { ADD_MOVIE_ITEM, GET_MOVIE_FAIL } from './../types/movieTypes'
import { ADD_POPULAR_MOVIE_REQUEST, ADD_POPULAR_MOVIE, ADD_POPULAR_MOVIE_FAILL } from './../types/movieTypes'
import { FEATURED_MOVIE_REQUEST, FEATURED_MOVIE, FEATURED_MOVIE_FAIL } from './../types/movieTypes'

export const movieItemReducer = (
    state = { movieInfo: [] },
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
                message: action.payload.message
            }
        default:
            return state
    }
}

export const popularMovieReducer = (
    state = { movieList: [] },
    action
) => {
    switch(action.type){
        case ADD_POPULAR_MOVIE_REQUEST: 
            return{
                ...state,
                loading: true,
                movieList: []
            }
        case ADD_POPULAR_MOVIE: 
            return{
                ...state,
                loading: false,
                movieList: action.payload
            }
        case ADD_POPULAR_MOVIE_FAILL: 
            return{
                ...state,
                message: action.payload.message
            }
        default:
            return state
    }
}

export const featuredMovieReducer = (
    state = { featuredData: [] },
    action
) => {
    switch(action.type){
        case FEATURED_MOVIE_REQUEST: 
            return{
                ...state,
                loading: true,
                featuredData: []
            }
        case FEATURED_MOVIE: 
            return{
                ...state,
                loading: false,
                featuredData: action.payload
            }
        case FEATURED_MOVIE_FAIL: 
            return{
                ...state,
                message: action.payload.message
            }
        default:
            return state
    }
}
