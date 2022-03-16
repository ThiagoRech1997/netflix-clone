import axios from 'axios'

const torrentApi = axios.create({
    baseURL: "http://192.168.108.204:3001/"
})

export default torrentApi