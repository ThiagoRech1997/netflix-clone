import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import MovieRow from "./../../components/MovieRow";
import FeaturedMovie from "./../../components/FeaturedMovie";
import Header from "./../../components/Header";

import { handlePopularMovie } from './../../store/actions/movieActions'
 
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const dispatch = useDispatch();

  const [blackHeader, setBlackHeader] = useState(false)

  const popularMovie = useSelector((state) => state.popularMovie)
  const { loading, movieList } = popularMovie
  const featuredMovie = useSelector((state) => state.featuredMovie)
  const { featuredData } = featuredMovie

  useEffect(() => {
  },[dispatch, featuredData])

  useEffect(()=>{
    dispatch(handlePopularMovie())
  },[dispatch])
console.log(movieList)
  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true)
      }else{
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  })

  return(
    <div className="page">
      <Header black={blackHeader}/>
      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        Projeto feito em ReactJS utilizando a API da plataforma ""The Movie Database""
      </footer>
      {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"/>
      </div>
      }
    </div>
  )
}