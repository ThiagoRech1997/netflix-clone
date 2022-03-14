import { combineReducers } from "redux";

import { mediaTypeReducer } from "./mediaTypeReducer"
import { movieItemReducer } from "./movieReducer"

export const reducers = combineReducers({
    mediaType: mediaTypeReducer,
    movieItem: movieItemReducer
});