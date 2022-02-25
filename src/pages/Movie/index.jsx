import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import tmdb from "./../../services/tmdb"

import "./style.css"

export default function Movie(){
    const { id, midia } = useParams()
    const [movieList, setMovieList] = useState(null)
    const [midiaType, setMidiaType] = useState("tv")
    let genres = []
    
    useEffect(async()=>{
        let info = []
        if(midia === "undefined"){
            info = await tmdb.getMovieInfo(id, "tv")
            setMidiaType("tv")
        }
        if(midia !== "undefined"){
            info = await tmdb.getMovieInfo(id, "movie")
            setMidiaType("movie")
        }

        setMovieList(info)
        console.log(movieList)
        await handleSetGenresList()
    }, [!movieList])

    function handleSetGenresList(){
        for(let i in movieList.genres){
            genres.push(movieList.genres[i].name)
        }
    }

    return(
        <div>
            {(movieList && midiaType === "movie") && 
                <div className="movie" style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movieList.backdrop_path})`
                }}>
                    <div className="movie--vertical">
                        <div className="movie--horizontal">
                            <img src={`https://image.tmdb.org/t/p/w300${movieList.poster_path}`} alt={movieList.original_title}/>
                            <div className="movie--details">
                                <div className="movie--title">{movieList.title !== "" ? movieList.title : movieList.original_title}</div>
                                <div className="movie--info">
                                    <div className="movie--points">{movieList.vote_average}</div>
                                    <div className="movie--year">{movieList.release_date}</div>
                                </div>
                                <div className="movie--genres">
                                    {handleSetGenresList()}
                                    <strong>{genres.join(', ')}</strong>
                                </div>
                                <div className="movie--description">{movieList.overview}</div>
                            </div>
                        </div>
                    </div>
                </div>
            } 
            {(movieList && midiaType === "tv") && 
                <div className="movie" style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movieList.backdrop_path})`
                }}>
                    <div className="movie--vertical">
                        <div className="movie--horizontal">
                            <img src={`https://image.tmdb.org/t/p/w300${movieList.poster_path}`} alt={movieList.original_name}/>
                            <div className="movie--details">
                                <div className="movie--title">{movieList.name !== "" ? movieList.name : movieList.original_name}</div>
                                <div className="movie--info">
                                    <div className="movie--points">{movieList.vote_average}</div>
                                    <div className="movie--year">{movieList.first_air_date}</div>
                                    <div className="movie--seasons">{movieList.number_of_seasons} temporada{movieList.number_of_seasons !== 1 ? 's' : ''}</div>
                                </div>
                                <div className="movie--genres">
                                    {handleSetGenresList()}
                                    <strong>{genres.join(', ')}</strong>
                                </div>
                                <div className="movie--description">{movieList.overview}</div>
                            </div>
                        </div>
                    </div>
                </div>
            }   
        </div>
    )
}