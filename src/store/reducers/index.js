import { combineReducers } from "redux";

import { mediaTypeReducer } from "./mediaTypeReducer"
import { movieItemReducer, popularMovieReducer, featuredMovieReducer, genresListReducer } from "./movieReducer"
import { torrentListReducer } from './torrentReducer'

export const reducers = combineReducers({
    mediaType: mediaTypeReducer,
    movieItem: movieItemReducer,
    popularMovie: popularMovieReducer,
    featuredMovie: featuredMovieReducer,
    torrentList: torrentListReducer,
    genresList: genresListReducer,
});