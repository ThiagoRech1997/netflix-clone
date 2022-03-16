import { ADD_MOVIE_ITEM, GET_MOVIE_FAIL } from './../types/movieTypes'

import tmdb from './../../services/tmdb'

import { getTorrent } from './torrentActions'

export const handleMovieItem = (id, midia) => async (dispatch) => {
    try{
        dispatch ({type: ADD_MOVIE_ITEM})
        let res = await tmdb.getMovieInfo(id, midia)

        dispatch({
            type: ADD_MOVIE_ITEM,
            payload: res
        })

        dispatch(getTorrent(Object(res), String(midia)))
    }catch (error) {
        dispatch({
          type: GET_MOVIE_FAIL,
          payload: { message: error.response.data.status_message },
        })
    }
}