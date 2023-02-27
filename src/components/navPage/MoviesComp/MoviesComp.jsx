import React, {useEffect} from 'react'
import cl from './MoviesComp.module.css'
import {useDispatch , useSelector} from 'react-redux';
import { getOfficialYandexMovies } from '../../../untils/API/getOfficialYandexMovies';
import { setStateOfficialMoviesComp } from 'redux/moviesComp-reducer';
import { Swiper, SwiperSlide } from 'swiper/react';
import MoviesCompItem from './MoviesCompItem'
import MyTitleComp from './../../UI/MyTitleComp/MyTitleComp'

export default function MoviesComp() {
    const dispatch = useDispatch();
    const stateMovies = useSelector(state=>state['Movies Comp'])
    useEffect(()=>{
        const officialHeroData = getOfficialYandexMovies('field=rating.kp&search=7-10&field=year&search=2022-2023&field=typeNumber&search=1&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&limit=15', setStateOfficialMoviesComp, dispatch);
    },[])   
    console.log(stateMovies)
  return (
    <section className={cl.section}>
        
            <div className="container">
                <MyTitleComp classTitle={cl.title} additionlySvg={cl.redordSvg}>Фильмы по вашему вкусу</MyTitleComp>
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
                        stateMovies['officialState'].map((e)=>{
                            return (
                                <SwiperSlide key={e.id} className={cl.slide}>
                                    <MoviesCompItem img={e.poster.url} descr={e.description} title={e.names[0].name}  year={e.year}/>
                                </SwiperSlide>
                            )
                        })
                    } 
                </Swiper>
            </div>
    
    </section>
  )
}
