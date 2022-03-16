import torrentApi from "./../../services/torrentApi"

import { GET_TORRENTS_REQUEST, GET_TORRENTS, PLAY_TORRENT_REQUEST, PLAY_TORRENT, STOP_TORRENT_REQUEST, STOP_TORRENT, RESET_STATES_TORRENTS } from './../types/torrentTypes'

export const getTorrent = (movie, midia) => async (dispatch) => {
    dispatch({ type: GET_TORRENTS_REQUEST })
    const torrent = await torrentApi.get(`getMovie?nameBR=${movie.title}&nameUS=${movie.original_title}&date=${movie.release_date}`)
    dispatch({
        type: GET_TORRENTS,
        payload: torrent.data.torrents
    })
}

export const playTorrent = (torrent, setPlay) => async (dispatch) => {
    dispatch({ type: PLAY_TORRENT_REQUEST });
  
    await torrentApi.get(`start?magnet=${torrent}`).then((res) => {
        dispatch({
            type: PLAY_TORRENT,
        });
        setPlay(true);
    });
};
  
export const stopTorrent = () => async (dispatch) => {
    dispatch({STOP_TORRENT_REQUEST})
    await torrentApi.get(`stop`).then((res) => {
        dispatch({
            type: STOP_TORRENT,
        });
    });
};

export const resetStateTorrents = () => async (dispatch) => {
    dispatch({
        type: RESET_STATES_TORRENTS,
    });
};