import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom"

import torrentApi from "./../../services/torrentApi"

import "./style.css"
import "bootstrap/dist/css/bootstrap.min.css"

import { handleMediaType } from './../../store/actions/mediaTypeActions'
import { handleMovieItem } from './../../store/actions/movieActions'

export default function Movie(){
    const { id, name } = useParams()
    const dispatch = useDispatch();

    const [options, setOptions] = useState([]);
    const [torrent, setTorrent] = useState("undefined");
    const [magnetLink, setMagnetLink] = useState({magnet: ""})
    let genres = []
    let torrents = []

    const mediaType = useSelector((state) => state.mediaType)
    const { midia } = mediaType
    const movieItem = useSelector((state) => state.movieItem)
    const { movieInfo } = movieItem
    

    useEffect(() => {
        torrentApi.get("stop")
    }, [])

    useEffect(()=>{
        dispatch(handleMediaType(String(name)))
        console.log("Tipo de Conteudo")
        console.log(midia)
        dispatch(handleMovieItem(Number(id), String(midia)))
        if((id !== movieInfo.id) || (movieInfo.success)){
            dispatch(handleMovieItem(Number(id), String(midia)))
            console.log("Dados da Midia")
            console.log(movieInfo)
        }
        //handleTorrentList()
        //handleSetGenresList()
    }, [dispatch, id])


    // eslint-disable-next-line react-hooks/exhaustive-deps
    function handleSetGenresList(){
        for(let i in movieInfo.genres){
            genres.push(movieInfo.genres[i].name)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function handleTorrentList(){
        if(midia === "tv"){
            let torrent = await torrentApi.get(`getTorrent?title=${movieInfo.original_name}&date=${movieInfo.first_air_date}`)
            torrents = torrent.data.torrents
        }
        if(midia === "movie"){
            let torrent = await torrentApi.get(`getTorrent?title=${movieInfo.original_title}&date=${movieInfo.release_date}`)
            torrents = torrent.data.torrents
        }
        console.log(torrents)

        if (torrents.length > 0) {
            const data = torrents.map((item, index) => ({
                key: index,
                title: item.size + " " + item.seeds + " " + item.title,
                value: item.link,
            }));
            setOptions(data);
            setTorrent(data[0].title)
            setMagnetLink({ magnet: data[0].value })
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
            {(movieInfo && midia === "movie") && 
                <div className="movie" style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})`
                }}>
                    <div className="movie--vertical">
                        <div className="movie--horizontal">
                            <img src={`https://image.tmdb.org/t/p/w300${movieInfo.poster_path}`} alt={movieInfo.original_title}/>
                            <div className="movie--details">
                                <div className="movie--title">{movieInfo.title !== "" ? movieInfo.title : movieInfo.original_title}</div>
                                <div className="movie--info">
                                    <div className="movie--points">{movieInfo.vote_average}</div>
                                    <div className="movie--year">{movieInfo.release_date}</div>
                                </div>
                                <div className="movie--genres">
                                    {handleSetGenresList()}
                                    <strong>{genres.join(', ')}</strong>
                                </div>
                                <div className="movie--description">{movieInfo.overview}</div>
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
            {(movieInfo && midia === "tv") && 
                <div className="movie" style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movieInfo.backdrop_path})`
                }}>
                    <div className="movie--vertical">
                        <div className="movie--horizontal">
                            <img src={`https://image.tmdb.org/t/p/w300${movieInfo.poster_path}`} alt={movieInfo.original_name}/>
                            <div className="movie--details">
                                <div className="movie--title">{movieInfo.name !== "" ? movieInfo.name : movieInfo.original_name}</div>
                                <div className="movie--info">
                                    <div className="movie--points">{movieInfo.vote_average}</div>
                                    <div className="movie--year">{movieInfo.first_air_date}</div>
                                    <div className="movie--seasons">{movieInfo.number_of_seasons} temporada{movieInfo.number_of_seasons !== 1 ? 's' : ''}</div>
                                </div>
                                <div className="movie--genres">
                                    {handleSetGenresList()}
                                    <strong>{genres.join(', ')}</strong>
                                </div>
                                <div className="movie--description">{movieInfo.overview}</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}