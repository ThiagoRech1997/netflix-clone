import { combineReducers } from "redux";

import { mediaTypeReducer } from "./mediaTypeReducer"
import { movieItemReducer, popularMovieReducer } from "./movieReducer"
import { torrentListReducer } from './torrentReducer'

export const reducers = combineReducers({
    mediaType: mediaTypeReducer,
    movieItem: movieItemReducer,
    popularMovie: popularMovieReducer,
    torrentList: torrentListReducer,
});