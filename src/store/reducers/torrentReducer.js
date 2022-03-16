import { GET_TORRENTS_REQUEST, GET_TORRENTS, RESET_STATES_TORRENTS } from './../types/torrentTypes'

export const torrentListReducer = (
    state = { torrents: [] },
    action
) => {
    switch(action.type) {
        case GET_TORRENTS_REQUEST:
            return { loadingTorrents: true, torrents: [] };
        case GET_TORRENTS:
            return {
                ...state,
                loadingTorrents: false,
                torrents: action.payload
            };
        case RESET_STATES_TORRENTS:
            return {
            ...state,
            torrents: [],
            };
        default:
            return state;
    }
};
