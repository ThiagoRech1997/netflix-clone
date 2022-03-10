import { combineReducers } from "redux";

import FriendListReducer from './FriendListReducer';

export const reducers = combineReducers({
    friends: FriendListReducer
});