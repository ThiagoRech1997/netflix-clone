import axios from 'axios'

const torrentApi = axios.create({
    baseURL: "http://localhost:3001/"
})

export default torrentApi