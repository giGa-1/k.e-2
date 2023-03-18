import React from 'react'
import cl from './../styles/BigSwiperList.module.css';
import MyTitleComp from './UI/MyTitleComp/MyTitleComp'
import { Swiper, SwiperSlide } from 'swiper/react';
import BigSwiperItem from './BigSwiperItem';

import { useInView } from 'react-intersection-observer';

export default function BigSwiperList({title, stateSwiper, similar=false }) {
    console.log(stateSwiper)
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
      });
  return (
    <>
            <div className={inView? [cl.block, cl.activeBlock].join` ` : cl.block} ref={ref}>
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

                                    <BigSwiperItem idFilm={e.id} img={e.img} descr={e.description} title={ e.nameRu}  year={e.year}/>
                                </SwiperSlide>
                            )
                        })
                    } 
                </Swiper>
            </div>

    </>
  )
}
