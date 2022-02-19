import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom";
import tmdb from "./../../tmdb"


export default function Movie(){
    const { id } = useParams()
    const [mediaInfo, setMediaInfo] = useState([])
    let flag = false
    
    useEffect(()=>{    
        loadInfo()
    },[])

    const loadInfo = async () => {
        do{
            let x = await tmdb.getMovieInfo(id, "tv").then((res) => {
                if(!(x.number_of_seasons)){
                    x = await tmdb.getMovieInfo(id, "movie")
                    flag = true
                }else{flag = true}
            })
            
            setMediaInfo(x)
            !mediaInfo ? flag = false : flag = true
        }while(flag === false)
        
        console.log(mediaInfo)   
    }

    return(
        <div>
            <h1>Info</h1>
        </div>
    )
}