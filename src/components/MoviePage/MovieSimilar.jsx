import React, { useState, useEffect } from 'react'
import cl from './MoviePage.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { getColorRating } from '../../untils/getColorRating';
import { getOfficialYandexMovies } from 'src/untils/API/getOfficialYandexMovies';
import Link from 'next/link';


export default function MovieSimilar({genre ='', minYear='', maxYear='', country='', isSerial = false, idState}) {
    const [stateSwiper, setStateSwiper] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    useEffect(()=>{
        console.log(`search?minYear=${minYear}&maxYear=${maxYear}&minRating=0&minVotes=10000&name=&type=movie&genre=${genre}&country=${country}&sort=rating&limit=10&page=1`,)
        const officialHeroData = !isSerial ? getOfficialYandexMovies(`search?minYear=${minYear}&maxYear=${maxYear}&minRating=0&minVotes=10000&name=&type=movie&genre=${genre}&country=${country}&sort=rating&limit=10&page=1`,  false)     :    getOfficialYandexMovies(`search?minYear=${minYear}&maxYear=${maxYear}&minRating=0&minVotes=10000&name=&type=tv-series&genre=${genre}&country=${country}&sort=rating&limit=10&page=1`) ;
        officialHeroData.then(data=>{
            setStateSwiper(data);setIsLoader(true);
            console.log(data)
        })  
    },[])

  return (
    <div className={cl.similarBlock}>
        <h2 className={cl.titleSimilar}>Вам также могут понравиться:</h2>
        <div className={cl.listSimilar}>
            <Swiper
                        spaceBetween={30}
                        slidesPerView={5}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        className={cl.swiper}
                    >
                        {
                            isLoader&&stateSwiper.filter((e)=>e.id!==idState).map((e,i)=>{
                                return (
                                    <SwiperSlide key={e.id} className={cl.slide}>
                                        <Link href={'/movies/'+e.id}>
                                        <li className={cl.itemSimilar} key={i}>
                                            <span className={[cl.ratingSimilar, getColorRating(e.rating)].join` `}>{`${e.rating}`.slice(0,3)}</span>
                                            <img src={e.url} alt="" className={cl.imgSimilar}/>
                                            <div className={cl.bottomItemSimilar}>
                                                <p className={cl.nameRu}>{e.name}</p>
                                                <div className={cl.infoSimilar}>
                                                    <span className={cl.similarDescr}>{isLoader&&e.year}, </span>
                                                    <span className={cl.similarDescr}>{isLoader&&e.genres.filter((e,i)=>i<2).join`, `}, </span>
                                                    <span className={cl.similarDescr}>{isLoader&&e.counties[0]}</span>
                                                </div>
                                            </div>
                                           
                                        </li>
                                        </Link>                                        
                                    </SwiperSlide>
                                )
                            })
                        } 
                </Swiper>
        </div>
    </div>
  )
}
