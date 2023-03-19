import React, { useEffect, useState } from 'react'
import cl from './HeroComp.module.css'
import { getUnofficialYandexMovies } from '../../../untils/API/getUnofficialYandexMovies';
import { getOfficialYandexMovies } from '../../../untils/API/getOfficialYandexMovies';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useSelector, useDispatch } from 'react-redux'
import { setStateUnofficialHero, setStateOfficialHero } from 'redux/hero-raducer'
import HeroItem from './HeroItem'

import { useInView } from 'react-intersection-observer';

export default function HeroComp() {

    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: .2,
      });
    const dispatch = useDispatch()

    useEffect(()=>{
        const officialHeroData = getOfficialYandexMovies('search?minYear=2022&limit=25&maxYear=2023&minRating=0&minVotes=15000&name=&type=movie&genre=&country=США&sort=rating&page=1', setStateOfficialHero, dispatch);
        
    },[])   

    const {unofficialState,officialState} = useSelector(state=>state['Hero']);
  return (
    <section ref={ref} className={cl.hero}>
          
             <div className={cl.content}>
             <Swiper
                 spaceBetween={50}
                 slidesPerView={1}
                 onSlideChange={() => console.log('slide change')}
                 onSwiper={(swiper) => console.log(swiper)}
                 className={cl.swiper}
             >
                 {officialState.length&&officialState.filter((e,i)=>i<=4).map((e,i)=>{
                     return (
                         <SwiperSlide key={i} className={cl.slide}>
                             <HeroItem rating={`${e.rating}`.slice(0,3)} title={e.name} country={e.counties[0]} genre={e.genres[0]} year={e.year} img={e.url} id={e.id} inView={inView}/>
                         </SwiperSlide>
                     )
                 })}
             </Swiper>
             
         </div>
          
           

   
    </section>
  )
}