import { combineReducers } from "redux";

import genresReducer from "./genresReducer"

export const reducers = combineReducers({
    genres: genresReducer
});