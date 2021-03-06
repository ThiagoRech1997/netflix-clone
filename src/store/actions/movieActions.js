import { ADD_MOVIE_ITEM, GET_MOVIE_FAIL, GET_MOVIE_REQUEST, GET_MOVIE } from './../types/movieTypes'
import { ADD_POPULAR_MOVIE_REQUEST, ADD_POPULAR_MOVIE, ADD_POPULAR_MOVIE_FAILL } from './../types/movieTypes'
import { FEATURED_MOVIE_REQUEST, FEATURED_MOVIE, FEATURED_MOVIE_FAIL } from './../types/movieTypes'
import { GENRES_MOVIE_REQUEST, GENRES_MOVIE, GENRES_MOVIE_FAIL } from './../types/movieTypes'
import { GET_LIST_REQUEST, GET_LIST, GET_LIST_FAIL } from './../types/movieTypes'

import tmdb from './../../services/tmdb'

import { getTorrent } from './torrentActions'

export const handleMovieItem = (id, midia) => async (dispatch) => {
    try{
        dispatch ({type: ADD_MOVIE_ITEM})
        const res = await tmdb.getMovieInfo(id, midia)

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

export const handlePopularMovie = () => async(dispatch) => {
    try{
        dispatch({ type: ADD_POPULAR_MOVIE_REQUEST })

        const res = await tmdb.getHomeList()

        dispatch({
            type: ADD_POPULAR_MOVIE,
            payload: res
        })
        dispatch(handleFeaturedMovie(res))
    } catch (error) {
        dispatch({
            type: ADD_POPULAR_MOVIE_FAILL,
            payload: { message: error.response.data.status_message }
        })
    }
}

export const handleFeaturedMovie = (movieList) => async(dispatch) => {
    try{
        dispatch({type:FEATURED_MOVIE_REQUEST})

        const originals = movieList.filter(i=>i.slug === "originals")
        const randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
        const chosen = originals[0].items.results[randomChosen]
        const chosenInfo = await tmdb.getMovieInfo(chosen.id, 'tv')

        dispatch({
            type: FEATURED_MOVIE,
            payload: chosenInfo
        })
      
    }catch (error){
        dispatch({
            type: FEATURED_MOVIE_FAIL,
            payload: { message: error.response.data.status_message }
        })
    }
}

export const handleGenresList = (midia) => async (dispatch) => {
    try{
        dispatch({type:GENRES_MOVIE_REQUEST})
        const res = await tmdb.getGenresList(midia)
        dispatch(handleContentList(midia, res.genres))
        dispatch({
            type: GENRES_MOVIE,
            payload: res
        })
    }catch (error) {
        dispatch({
            type: GENRES_MOVIE_FAIL,
            payload: { message: error.response.data.status_message }
        })
    }
}

export const handleContentList = (midia, genres) => async (dispatch) => {
    try{
        dispatch({type: GET_MOVIE_REQUEST })

        let data = []
        for(let i = 0; i < genres.length; i++){
            data[i] = await tmdb.getContentList(midia, genres[i])
        }
        const res = data
        dispatch(handleLoadList(midia))
        dispatch({
            type: GET_MOVIE,
            payload: res
        })
    }catch (error){
        dispatch({
            type: GET_MOVIE_FAIL,
            payload: { message: error.response.data.status_message }
        })
    }
}

export const handleLoadList = (midia) => async (dispatch) => {
    try{
        dispatch({type: GET_LIST_REQUEST })
        dispatch({
            type: GET_LIST,
            payload: midia
        })
    }catch (error){
        dispatch({
            type: GET_LIST_FAIL,
            payload: { message: error.response.data.status_message }
        })
    }
}