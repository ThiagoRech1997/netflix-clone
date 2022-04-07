import axios from 'axios'

const torrentApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export default torrentApi