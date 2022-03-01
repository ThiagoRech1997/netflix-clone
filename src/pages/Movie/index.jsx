import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom"

import tmdb from "./../../services/tmdb"
import torrentApi from "./../../services/torrentApi"

import "./style.css"
import "bootstrap/dist/css/bootstrap.min.css"

export default function Movie(){
    const { id, midia } = useParams()
    const [movieList, setMovieList] = useState(null)
    const [midiaType, setMidiaType] = useState("tv")
    const [options, setOptions] = useState([]);
    const [torrent, setTorrent] = useState("undefined");
    const [magnetLink, setMagnetLink] = useState({magnet: ""})
    let genres = []
    let torrents = []
    
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
        handleTorrentList()
        setMovieList(info)
        await handleSetGenresList()
    }, [!movieList])

    useEffect(async () => {
        torrentApi.get("stop")
    }, [])


    function handleSetGenresList(){
        for(let i in movieList.genres){
            genres.push(movieList.genres[i].name)
        }
    }

    async function handleTorrentList(){
        if(midiaType === "tv"){
            let torrent = await torrentApi.get(`getTorrent?title=${movieList.original_name}&date=${movieList.first_air_date}`)
            torrents = torrent.data.torrents
        }
        if(midiaType === "movie"){
            let torrent = await torrentApi.get(`getTorrent?title=${movieList.original_title}&date=${movieList.release_date}`)
            torrents = torrent.data.torrents
        }
        console.log(torrents)

        if (torrents.length > 0) {
            const data = await torrents.map((item, index) => ({
              key: index,
              title: item.size + " " + item.seeds + " " + item.title,
              value: item.link,
            }));
            await setOptions(data);
            await setTorrent(data[0].title)
            await setMagnetLink({magnet: data[0].value})
        }
    }
    async function onPlay(){
        for(let i in options){
            if(torrent === options[i].title){
                setMagnetLink({magnet: options[i].value})
            }
        }
        console.log(torrent)
        console.log(magnetLink)
        torrentApi.get(`start?magnet=${magnetLink.magnet}`)
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
                                <div className="movie--selector">
                                    <Form.Select
                                        value={torrent}
                                        onChange={e => setTorrent(e.target.value)}
                                    >
                                        {options.flatMap((data, index) => (
                                            <option key={index}>{data.title}</option>
                                        ))}
                                    </Form.Select>
                                    <div className="movie--buttons">
                                        <Link to="/watch/play">
                                            <a className="movie--play" onClick={() => onPlay()}>Play</a>
                                        </Link>
                                    </div>
                                </div>
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