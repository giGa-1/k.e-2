import React from 'react'
import cl from './../styles/BigSwiperList.module.css';
import MyTitleComp from './UI/MyTitleComp/MyTitleComp'
import { Swiper, SwiperSlide } from 'swiper/react';
import BigSwiperItem from './BigSwiperItem';

export default function BigSwiperList({title, stateSwiper, similar=false }) {
    console.log(stateSwiper)
  return (
    <>
        
            <div className="container">
                <MyTitleComp classTitle={cl.title} additionlySvg={cl.redordSvg}>{title}</MyTitleComp>
            </div>
            <div className={cl.block}>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={5}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    className={cl.swiper}
                >
                    {
                        stateSwiper&&stateSwiper.map((e)=>{
                            return (
                                <SwiperSlide key={e.id} className={cl.slide}>
                                    <BigSwiperItem idFilm={e.id} img={e.poster.url} descr={e.description} title={similar ? e.name : e.names[0].name}  year={e.year}/>
                                </SwiperSlide>
                            )
                        })
                    } 
                </Swiper>
            </div>
    
    </>
  )
}
