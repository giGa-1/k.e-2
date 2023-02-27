import React, {useEffect} from 'react'
import cl from './SerialsComp.module.css'
import {useDispatch , useSelector} from 'react-redux';
import { getOfficialYandexMovies } from '../../../untils/API/getOfficialYandexMovies';
import { setStateOfficialSerialsComp } from 'redux/serialsComp-reducer'
import { Swiper, SwiperSlide } from 'swiper/react';
import SerialsCompItem from './SerialsCompItem'
import MyTitleComp from './../../UI/MyTitleComp/MyTitleComp'


export default function SerialsComp() {
    const dispatch = useDispatch();
    const stateSerials = useSelector(state=>state['Serials Comp'])
    useEffect(()=>{
        const officialHeroData = getOfficialYandexMovies('field=rating.kp&search=7-10&field=year&search=2022-2023&field=typeNumber&search=2&sortField=year&sortType=1&sortField=votes.imdb&sortType=-1&limit=15', setStateOfficialSerialsComp, dispatch);
    
    },[])   
    console.log(stateSerials)
  return (
    <section className={cl.section}>
            <div className="container">
                <MyTitleComp classTitle={cl.title} additionlySvg={cl.cinemaSvg}>Сериалы по вашему вкусу</MyTitleComp>
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
                        stateSerials['officialState'].map((e)=>{
                            return (
                                <SwiperSlide key={e.id} className={cl.slide}>
                                    <SerialsCompItem img={e.poster.url} descr={e.description} title={e.names[0].name}  year={e.year}/>
                                </SwiperSlide>
                            )
                        })
                    } 
                </Swiper>
            </div>
       
    </section>
  )
}
