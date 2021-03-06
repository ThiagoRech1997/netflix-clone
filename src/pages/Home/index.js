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
  const { movieList } = popularMovie
  const featuredMovie = useSelector((state) => state.featuredMovie)
  const { featuredData } = featuredMovie
  const getList = useSelector((state) => state.getList)
  const { loadList } = getList
  const getContentList = useSelector((state) => state.getContentList)
  const { contentList } = getContentList

  useEffect(()=>{
    dispatch(handlePopularMovie())
  },[dispatch])
  
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
      {loadList === '' && <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      }
      {loadList !== '' && 
        <section className="lists">
          {contentList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} />
          ))}
        </section>
      }
      <footer>
        Projeto feito em ReactJS utilizando a API da plataforma ""The Movie Database""
      </footer>
      {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="load-list"/>
      </div>
      }
    </div>
  )
}