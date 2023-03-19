import React, {useEffect} from 'react'
import cl from './MoviesComp.module.css'
import {useDispatch , useSelector} from 'react-redux';
import { getOfficialYandexMovies } from '../../../untils/API/getOfficialYandexMovies';
import { setStateOfficialMoviesComp } from 'redux/moviesComp-reducer';
import { Swiper, SwiperSlide } from 'swiper/react';
import MoviesCompItem from './MoviesCompItem'
import MyTitleComp from './../../UI/MyTitleComp/MyTitleComp'
import BigSwiperList from '@/components/BigSwiperList';

import Link from 'next/link';
import { useInView } from 'react-intersection-observer';



export default function MoviesComp() {
    const dispatch = useDispatch();
    const stateMovies = useSelector(state=>state['Movies Comp'])

    const { ref, inView, entry } = useInView({
      /* Optional options */
      threshold: 0,
    });
    useEffect(()=>{
      
        const officialHeroData = getOfficialYandexMovies('search?minYear=2019&maxYear=2023&minRating=0&limit=25&minVotes=350000&name=&type=movie&genre=&country=&sort=rating&page=1', setStateOfficialMoviesComp, dispatch);

    },[])   
  return (
    <section className={cl.section}>

       <Link href='/movies' className={cl.linkMore}>
        <div ref={ref} className={ inView ? ["miniCont", cl.contTitle, cl.contActive].join` ` : ["miniCont", cl.contTitle].join` `}>
              <MyTitleComp classTitle={cl.title} animation={false} additionlySvg={cl.redordSvg}>Фильмы на выш выбор</MyTitleComp>
              <div className={cl.linkItem}>
              
                  <span className={cl.arrow}>

                  </span>
              </div>
          </div>
       </Link>
       

        <BigSwiperList stateSwiper={stateMovies['officialState']} title={'Лучшие фильмы по вашему вкусу'}/>

    
    </section>
  )
}
