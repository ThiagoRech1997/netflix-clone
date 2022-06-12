import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Form from 'react-bootstrap/Form'

import './style.css'
import "bootstrap/dist/css/bootstrap.min.css"

import { handleGenresList } from './../../store/actions/movieActions'

// eslint-disable-next-line import/no-anonymous-default-export
export default ({black}) => {
    const dispatch = useDispatch();
    const { selected, setSelected } = useState("undefined")

    const genresList = useSelector((state) => state.genresList)
    const { genres } = genresList.genres

    function handleGenres(midia) {
        dispatch(handleGenresList(midia))
    }

    return (
        <header className={black ? 'black' : ''}>
            <div className="header--optionsLeft">
                <div className="header--logo">
                    <a href="/watch">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt='logo'/>
                    </a>
                </div>
                <div className="header--menu">
                    <strong onClick={() => handleGenres("tv")}>Series</strong>
                    <strong onClick={() => handleGenres("movie")}>Filmes</strong>
                    {genres &&
                    <Form.Select
                        value={selected}
                        onChange={e => setSelected(e.target.value)}
                    >
                        {genres.map((data, index) => (
                            <option key={index}>{data.name}</option>
                        ))}
                    </Form.Select> }
                </div>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="user"/>
                </a>
            </div>
        </header>
    )
}