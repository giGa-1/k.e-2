import React, { useEffect, useState } from 'react'
import cl from './HeroComp.module.css'
import { getUnofficialYandexMovies } from '../../../untils/API/getUnofficialYandexMovies';
import { getOfficialYandexMovies } from '../../../untils/API/getOfficialYandexMovies';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useSelector, useDispatch } from 'react-redux'
import { setStateUnofficialHero, setStateOfficialHero } from 'redux/hero-raducer'
import HeroItem from './HeroItem'

export default function HeroComp() {
    
    const dispatch = useDispatch()

    useEffect(()=>{
        const officialHeroData = getOfficialYandexMovies('field=rating.kp&search=7-10&field=year&search=2022-2023&field=typeNumber&search=1&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&limit=5', setStateOfficialHero, dispatch);
        
        const unofficialHeroData = getUnofficialYandexMovies('/top/list/50', setStateUnofficialHero, dispatch);
    },[])   

    const {unofficialState,officialState} = useSelector(state=>state['Hero']);
    console.log(unofficialState.filter((e,i)=>i<=4))
    console.log(officialState)
  return (
    <section className={cl.hero}>
        
            <div className={cl.content}>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    className={cl.swiper}
                >
                    {unofficialState.filter((e,i)=>i<=4).map((e,i)=>{
                        return (
                            <SwiperSlide key={i} className={cl.slide}>
                                <HeroItem infoObj={e}/>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                
            </div>
   
    </section>
  )
}