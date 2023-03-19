import React, {useEffect} from 'react'
import cl from './SerialsComp.module.css'
import {useDispatch , useSelector} from 'react-redux';
import { getOfficialYandexMovies } from '../../../untils/API/getOfficialYandexMovies';
import { setStateOfficialSerialsComp } from 'redux/serialsComp-reducer'
import { Swiper, SwiperSlide } from 'swiper/react';
import SerialsCompItem from './SerialsCompItem'
import MyTitleComp from './../../UI/MyTitleComp/MyTitleComp'
import BigSwiperList from '@/components/BigSwiperList';

import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export default function SerialsComp() {
    const dispatch = useDispatch();
    const { ref, inView, entry } = useInView({
      /* Optional options */
      threshold: 0,
    });
    const stateSerials = useSelector(state=>state['Serials Comp'])
    useEffect(()=>{
        const officialHeroData = getOfficialYandexMovies('search?minYear=2016&limit=25&maxYear=2023&minRating=0&minVotes=200000&name=&type=tv-series&genre=&country=&sort=rating&page=1', setStateOfficialSerialsComp, dispatch);
    
    },[])   
  return (
    <section className={cl.section}>

       <Link href='/movies' className={cl.linkMore}>
        <div ref={ref} className={ inView ? ["miniCont", cl.contTitle, cl.contActive].join` ` : ["miniCont", cl.contTitle].join` `}>
              <MyTitleComp classTitle={cl.title} animation={false} additionlySvg={cl.redordSvg}>Сериалы на любой вкус</MyTitleComp>
              <div className={cl.linkItem}>
              
                  <span className={cl.arrow}>

                  </span>
              </div>
          </div>
       </Link>
        <BigSwiperList stateSwiper={stateSerials['officialState']} title={'Лучшие сериалы по вашему вкусу'}/>
    </section>
  )
}
