import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import tmdb from "./../../tmdb"


export default function Movie(){
    const { id } = useParams()
    const [movieList, setMovieList] = useState(null)
    
    useEffect(()=>{
        const loadInfo = async () => {
            let midia = await tmdb.getMovieInfo(id, "tv")
            if(!(midia.number_of_seasons) && !(midia.original_name)){
                midia = await tmdb.getMovieInfo(id, "movie")
            }
            setMovieList(midia)
            console.log(movieList)
        }
        loadInfo()
    }, [])

    return(
        <div>
            <h1>Test</h1>
        </div>
    )
}