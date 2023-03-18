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
    console.log(inView)
    const dispatch = useDispatch()

    useEffect(()=>{
        // const officialHeroData = getOfficialYandexMovies('/v1/movie?limit=50000', setStateOfficialHero, dispatch);
        
        // const unofficialHeroData = getUnofficialYandexMovies('?type=FILM&&yearFrom=2021&yearTo=2023&page=1', setStateUnofficialHero, dispatch);
    },[])   

    const {unofficialState,officialState} = useSelector(state=>state['Hero']);
    console.log(officialState)
  return (
    <section ref={ref} className={cl.hero}>
          
             <div className={cl.content}>
             {/* <Swiper
                 spaceBetween={50}
                 slidesPerView={1}
                 onSlideChange={() => console.log('slide change')}
                 onSwiper={(swiper) => console.log(swiper)}
                 className={cl.swiper}
             >
                 {unofficialState.filter((e,i)=>i<=4).map((e,i)=>{
                     return (
                         <SwiperSlide key={i} className={cl.slide}>
                             <HeroItem infoObj={e} inView={inView}/>
                         </SwiperSlide>
                     )
                 })}
             </Swiper>
              */}
         </div>
          
           

   
    </section>
  )
}