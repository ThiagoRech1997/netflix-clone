const API_BASE = 'https://api.themoviedb.org/3'


const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`)
    const json = await req.json()
    return json
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais da Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=${process.env.REACT_APP_TMDB_LANGUAGE}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados',
                items: await basicFetch(`/trending/all/week?language=${process.env.REACT_APP_TMDB_LANGUAGE}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=${process.env.REACT_APP_TMDB_LANGUAGE}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Acao',
                items: await basicFetch(`/discover/movie?with_genres=28&language=${process.env.REACT_APP_TMDB_LANGUAGE}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comedia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=${process.env.REACT_APP_TMDB_LANGUAGE}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=${process.env.REACT_APP_TMDB_LANGUAGE}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=${process.env.REACT_APP_TMDB_LANGUAGE}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentarios',
                items: await basicFetch(`/discover/movie?with_genres=99&language=${process.env.REACT_APP_TMDB_LANGUAGE}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
            },
        ]
    },
    getMovieInfo: async (movieId, type) => {
        let info = await basicFetch(`/${type}/${movieId}?language=${process.env.REACT_APP_TMDB_LANGUAGE}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        return info
    },
    getGenresList: async (midia) => {
        let info = await basicFetch(`/genre/${midia}/list?language=${process.env.REACT_APP_TMDB_LANGUAGE}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        return info
    },
    getContentList: async (media, genres) => {
        return {
            title: genres.name,
            items: await basicFetch(`/discover/${media}?with_genres=${genres.id}&language=${process.env.REACT_APP_TMDB_LANGUAGE}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`)
        }
    }
}