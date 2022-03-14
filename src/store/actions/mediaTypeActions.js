import { ADD_MEDIA_TYPE } from './../types/movieTypes'

import { handleMovieItem } from './movieActions'

export const handleMediaType = (id, name) => (dispatch) => {
    dispatch({ type: ADD_MEDIA_TYPE })

    let mediaType
    if(name === "undefined"){
        mediaType = "tv"
    }
    if(name !== "undefined"){
        mediaType = "movie"
    }

    dispatch({
        type: ADD_MEDIA_TYPE,
        payload: mediaType
    })
    
    dispatch(handleMovieItem(Number(id), String(mediaType)))
}