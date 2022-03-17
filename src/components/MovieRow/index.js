import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavigateBefore } from "@material-ui/icons"
import { NavigateNext } from "@material-ui/icons"
import { Link } from "react-router-dom"

import './style.css'

import { stopTorrent, resetStateTorrents } from './../../store/actions/torrentActions'

export default function MovieRow({title, items}){
    const dispatch = useDispatch();
    const [scrollX, setScrollX] = useState(0)

    useEffect(() => {
        dispatch(stopTorrent());
        dispatch(resetStateTorrents())
    }, [dispatch])
    
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2)
        if(x > 0)
            x = 0
        setScrollX(x)
    }
    const handleRightArrow = () =>{
        let x = scrollX - Math.round(window.innerWidth / 2)
        let listW = items.results.length * 200
        if((window.innerWidth - listW) > x)
            x = (window.innerWidth - listW) - 60
        setScrollX(x)
    }

    return(
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBefore style={{fontSize: 50}}/>
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNext style={{fontSize: 50}}/>
            </div>
            <div className="movieRow--listarea">
                <div className='movieRow--list' style={{
                    marginLeft: scrollX,
                    width: items.results.length * 200
                }}>
                    {items.results.length > 0 && items.results.map((item, key) =>(
                        <div key={key} className="movieRow--item">
                            <Link to={`/watch/${item.id}/${item.original_title}`}>
                                <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} 
                                alt={item.original_title} 
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}