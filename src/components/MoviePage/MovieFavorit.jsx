import React from 'react';
import cl from './MoviePage.module.css';
import MyTitleComp from './../UI/MyTitleComp/MyTitleComp';
import { Swiper, SwiperSlide } from 'swiper/react';
import BigSwiperItem from './../BigSwiperItem';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function MovieFavorit() {
    
    const favState = useSelector(state=>state['Fav State']).videoContent;

    const scrollToFav = (e)=>{
        e.preventDefault();
        window.scrollTo({behavior: 'smooth', top: '1000px'});
    }

    return (
        <section className={cl.favSection}>
            <div className="container">
                <MyTitleComp classTitle={cl.titleFav} isCenter={false} additionlySvg={''}>Ваше избранное</MyTitleComp>
                <div className={cl.block}>
                    {
                        favState.length ? 
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={5}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                className={cl.swiper}
                            >
                                {
                                    favState&&favState.map((e)=>{
                                        return (
                                            <SwiperSlide key={e.id} className={cl.slide}>
                                                <BigSwiperItem idFilm={e.id} img={e.infoObj.poster.url} descr={e.infoObj.description} title={e.infoObj.names[0].name}  year={e.infoObj.year}/>
                                            </SwiperSlide>
                                        )
                                    })
                                } 
                            </Swiper>
                        :
                        <div className={cl.textBlockFav}>
                            <p className={cl.textFav}>Ваш список избранных фильмов пуст. Возможно вам помогут наши <span onClick={e=>scrollToFav(e)} className={cl.linkFav}>подборки</span></p>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}
