import torrentApi from "./../../services/torrentApi"

import { GET_TORRENTS_REQUEST, GET_TORRENTS, RESET_STATES_TORRENTS } from './../types/torrentTypes'

export const getTorrent = (movie, midia) => async (dispatch) => {
    dispatch({ type: GET_TORRENTS_REQUEST })
    const torrent = await torrentApi.get(`getMovie?nameBR=${movie.title}&nameUS=${movie.original_title}&date=${movie.release_date}`)
    dispatch({
        type: GET_TORRENTS,
        payload: torrent.data.torrents
    })
}

export const resetStateTorrents = () => async (dispatch) => {
    dispatch({
        type: RESET_STATES_TORRENTS,
    });
};