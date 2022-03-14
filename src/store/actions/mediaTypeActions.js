import { ADD_MEDIA_TYPE } from './../types/movieTypes'

export const handleMediaType = (name) => (dispatch) => {
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
    
}