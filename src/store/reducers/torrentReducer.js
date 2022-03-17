import { GET_TORRENTS_REQUEST, GET_TORRENTS, PLAY_TORRENT_REQUEST, PLAY_TORRENT, STOP_TORRENT_REQUEST, STOP_TORRENT, RESET_STATES_TORRENTS } from './../types/torrentTypes'

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
        case PLAY_TORRENT_REQUEST:
            return {
                ...state,
                loadingTorrents: true,
            };
        case PLAY_TORRENT:
            return {
                ...state,
                loadingTorrents: false,
            };
        case STOP_TORRENT_REQUEST:
            return {
                loadingTorrents: true,
                ...state,
            };
        case STOP_TORRENT:
            return {
                ...state,
                loadingTorrents: false,
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
