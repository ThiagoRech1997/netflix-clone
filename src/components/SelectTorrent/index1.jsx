import React, { useEffect, useState } from "react";
import Select from "react-select";
import torrentApi from "./../../services/torrentApi"

export default function SelectTorrent(movieList, midiaType){
    const [torrents, setTorrents] = useState(null)
    useEffect(async () => {
        if(midiaType === "tv"){
            let torrent = await torrentApi.get(`getTorrent?title=${movieList.original_name}&date=${movieList.first_air_date}`)
            setTorrents(torrent.data.torrents)
        }
        if(midiaType === "movie"){
            let torrent = await torrentApi.get(`getTorrent?title=${movieList.original_title}&date=${movieList.release_date}`)
            setTorrents(torrent.data.torrents)
        }
        console.log(torrents)
    }, [!torrents])
    return (
        <Select
            styles=''
            value=''
            onChange=''
            options=""
        />
    );
}