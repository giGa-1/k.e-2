import React from 'react'
import cl from './MoviePage.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';

import ReactPlayer from 'react-player/lazy'


export default function MovieVideos({infoObj = [1,1,1,1,1] }) {
  return (
    <div className={cl.videomaterialBlock}>
        <h3 className={cl.titleTabs}>Трейлеры и тизеры</h3>
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
                        <div className={cl.videoItem}>
                            <ReactPlayer url={'https://www.youtube.com/watch?v=4CnqZeUNioA'} style={{maxWidth:`300px`, maxHeight: '190px', borderRadius: '8px', backgroundColor:'#222'}}>
                            </ReactPlayer>
                            <p className={cl.descrAbout}>Официальный трейлер</p>
                        </div>
                    </SwiperSlide>
                )
            }
        </Swiper>
    </div>  
  )
}
