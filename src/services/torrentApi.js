import axios from 'axios'

const torrentApi = axios.create({
    baseURL: "http://172.16.0.16:3001/"
})

export default torrentApi