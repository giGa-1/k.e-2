import React from 'react'
import cl from  './FocusComp.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import FocusCompItem from './FocusCompItem';
import MyTitleComp from './../../UI/MyTitleComp/MyTitleComp'

import Link from 'next/link';

export default function FocusComp() {
    
    const state = useSelector(state=>state['Focus Comp'])
  
    return (
    <div className={cl.section}>
        <div className="container">
            <div className={cl.content}>
                <MyTitleComp classTitle={cl.title}>Будьте в курсе всех событий!</MyTitleComp>
                <div className={cl.swiperBlock}>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={5}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        className={cl.swiper}
                    >
                        {state.map(e=>{
                            return (
                                <SwiperSlide key={e.id}>
                                    <Link href={'/events/'+e.id}>
                                        <FocusCompItem id={e.id} title={e.title} img={'/img/back-focus.png'}/>
                                    </Link>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    </div>
  )
}
