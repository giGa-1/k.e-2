import React from 'react'
import cl from './MoviePage.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';



export default function MovieFrames({infoObj = [1,1,1,1,1]}) {
  return (
    <div className={cl.framesBlock}>
       <h3 className={cl.titleTabs}>Кадры из фильма</h3>
        <Swiper
            spaceBetween={30}
            slidesPerView={2}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            className={cl.swiper}
        >
            {
                infoObj.map((e,i)=>

                    <SwiperSlide key={i} className={cl.swiperSlide}>
                        <div className={cl.imgItem}>
                           <img src={e} className={cl.imgFrame}/>
                        </div>
                    </SwiperSlide>
                )
            }
        </Swiper>
    </div>
  )
}
