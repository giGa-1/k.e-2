import React, {useEffect, useState, useMemo} from 'react'
import { EffectFade } from 'swiper';
import { getActorKinopoisk } from 'src/untils/API/getActorKinopoisk';

import {setInfoActorState} from './../../../redux/ActorState-reducer'
import cl from './ActorPage.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import {useSelector, useDispatch} from 'react-redux'
import {replacerComments} from './../../untils/Replacer'
import { GetBestMoviesActor } from '../../untils/GetBestMoviesActor';
import Link from 'next/link';
import { getColorRating } from '../../untils/getColorRating';
import { getActorUnOAPI } from '../../untils/API/getActorUnOAPI';
import { getPersonInfo } from '../../untils/API/getPersonInfo';
import { useRef } from 'react';


export default function ActorPage({idActor}) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [allLoading, setAllLoading] = useState(false)
    const [isBioActive, setIsBioActive] = useState(null)

    const [isFav, setIsFav] = useState(false)
    const [stateGenInfo, setStateGenInfo] = useState([]);
    const stateActor = useSelector(state=>state['Actor State']).infoObj

    const bioDescr = useRef()
    const bioBody = useRef();

    useMemo(()=>{
        if(isBioActive){
            bioBody.current.style.maxHeight = bioDescr.current.offsetHeight+'px'
        } else if (isBioActive !== null) {
            bioBody.current.style.maxHeight = '230px'
        }
    },[isBioActive])

    console.log(idActor,stateActor)
    useEffect(()=>{
        const officialHeroData = getActorUnOAPI(idActor);
        officialHeroData.then(data=>{
            console.log(data)
            dispatch(setInfoActorState(data));
            setIsLoading(true);

        })

    },[])

    useMemo(()=>{
        if(isLoading) {
            const statePerson = getPersonInfo(stateActor.nameEn)
            statePerson.then((data)=>{
                setAllLoading(true);
                setStateGenInfo(data)
            })
        } 
    },[isLoading])

    

    console.log(stateActor, stateGenInfo)

    const setFav = (e)=>{
        e.preventDefault();
        setIsFav(!isFav)
    }
    

  return (
    <section className={cl.section}>
          <div className={!allLoading ? ["loaderBLock", "loaderActive"].join` ` :"loaderBLock"}>
            <div className={"loader"}>
                <span className={"loadSvg"}>
                <svg version="1.1" id="loader-1"  x="0px" y="0px"
                    width="100px" height="100px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40" >
                    <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                    <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                        C22.32,8.481,24.301,9.057,26.013,10.047z">
                        <animateTransform attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 20 20"
                        to="360 20 20"
                        dur="0.5s"
                        repeatCount="indefinite"/>
                        </path>
                    </svg>
                </span>
            </div>
        </div>
        <div className="container">
            <div className={cl.content}>
                <div className={cl.leftContent}>
                    <div className={cl.imgBLockActor}>
                    <img src={isLoading&&stateActor.posterUrl}  className={cl.actorImgBack}/>

                        <img src={isLoading&&stateActor.posterUrl}  className={cl.actorImg}/>
                    </div>
                    {/* <div className={isFav ? [cl.favBlock, cl.activeFav].join` ` : cl.favBlock} onClick={e=>setFav(e)}>
                        <span className={cl.textFav}>
                            В Избранное
                        </span>
                        <span className={cl.favIcon}>

                        </span>
                    </div> */}
                   <div className={cl.framesBlock}>
                        <h2 className={cl.titleFrame}>Кадры:</h2>
                        <div className={cl.framesHead}>
                            <span className={cl.nextArrow}>
                        <svg width="35px" height="35px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z" /></svg>

                            </span>
                            <span className={cl.prevArrow}>
                        <svg width="35px" height="35px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z" /></svg>

                            </span>
                            <Swiper
                                   
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    onSlideChange={() => console.log('slide change')}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    className={cl.swiperFrame}
                                >
                                    {allLoading&&stateGenInfo.photos.filter((e,i,arr)=>i<=~~(arr.length/2)).map((e,i)=>{
                                        return (
                                        
                                            <SwiperSlide key={i} className={cl.slideFrame}>
                                               <li className={cl.itemFrame}>
                                                    <img src={e} alt="" className={cl.frameImg}/>
                                                </li>                                      
                                            </SwiperSlide>
                                        )
                                    })}
                                    ...
                                </Swiper>
                        </div>
                        <div className={cl.framesFoter}>
                        <span className={cl.nextArrow}>
                            <svg width="35px" height="35px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z" /></svg>

                        </span>
                            <span className={cl.prevArrow}>
                        <svg width="35px" height="35px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z" /></svg>

                            </span>
                        <Swiper
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    onSlideChange={() => console.log('slide change')}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    className={cl.swiperFrame}
                                >
                                    
                                    {allLoading&&stateGenInfo.photos.filter((e,i,arr)=>i>~~(arr.length/2)).map((e,i)=>{
                                        return (
                                        
                                            <SwiperSlide key={i} className={cl.slideFrame}>
                                               <li className={cl.itemFrame}>
                                                    <img src={e} alt="" className={cl.frameImg}/>
                                                </li>                                      
                                            </SwiperSlide>
                                            
                                        )
                                    })}
                                    ...
                                </Swiper>
                        </div>
                   </div>
                </div>
                <div className={cl.rightBlock}>
                    <div className={cl.tabsTextBlock}>
                        <p className={cl.nameEnActor}>{isLoading&&stateActor.nameEn}</p>
                        <h1 className={cl.nameActor}>
                            {isLoading&&stateActor.nameRu}
                        </h1>
                    </div>
                    <div className={cl.bottomBlock}>
                        <div className={cl.headContent}>
                        <ul className={cl.listInfoActor}>
                            <li className={cl.itemAboutActor}>
                                <span className={cl.itemLeft}>
                                    Рост
                                </span>
                                <span className={cl.itemRight}>
                                    {isLoading&&stateActor.growth ? stateActor.growth : '-'} см
                                </span>
                            </li>
                            <li className={cl.itemAboutActor}>
                                <span className={cl.itemLeft}>
                                    Пол
                                </span>
                                <span className={cl.itemRight}>
                                    {isLoading&&stateActor.sex ? stateActor.sex === 'MALE' ? 'муж.' : 'жен.' : '-'}
                                </span>
                            </li>
                            <li className={cl.itemAboutActor}>
                                <span className={cl.itemLeft}>
                                    Возраст
                                </span>
                                <span className={cl.itemRight}>
                                    {isLoading&&stateActor.age ? stateActor.age : '-'}
                                </span>
                            </li>
                            <li className={cl.itemAboutActor}>
                                <span className={cl.itemLeft}>
                                    Место рождения
                                </span>
                                <span className={cl.itemRight}>
                                    {isLoading&&stateActor.birthplace ? `${stateActor.birthplace}` : '-'}
                                </span>
                            </li>
                            <li className={cl.itemAboutActor}>
                                <span className={cl.itemLeft}>
                                    Дата рождения
                                </span>
                                <span className={cl.itemRight}>
                                    {isLoading&&stateActor.birthday ? stateActor.birthday.split`T`[0]: '-'}
                                </span>
                            </li>
                            <li className={cl.itemAboutActor}>
                                <span className={cl.itemLeft}>
                                    Карьера
                                </span>
                                <span className={cl.itemRight}>
                                    {isLoading&&stateActor.profession ? stateActor.profession : '-'}
                                </span>
                            </li>
                            <li className={cl.itemAboutActor}>
                                <span className={cl.itemLeft}>
                                    {stateActor.sex ? stateActor.sex === 'MALE' ? 'Обручен с' : 'Замужем за' : '-'}
                                </span>
                                <span className={cl.itemRight}>
                                    {isLoading&&stateActor.spouses.length ? `${stateActor.spouses[0].name}, детей - ${stateActor.spouses[0].children}` : '-'}
                                </span>
                            </li>
                        </ul>
                        <div className={cl.factBlock}>
                            <h3 className={cl.titleFact}>{stateActor.facts&&'Интересные факты:'}</h3>
                            <ul className={cl.listFacts}>
                                {isLoading ? 
                                 stateActor.facts&&stateActor.facts.filter((e,i)=>i<=3).map((e,i)=>{
                                    return (
                                        <React.Fragment key={i}>
                                            <li className={cl.factText}>
                                                <span className={cl.factDot}></span>
                                                {e}
                                            </li>
                                        </React.Fragment>
                                    )
                                })
                                :""
                                   
                                }
                            </ul>
                          
                        </div>
                        </div>
                        <div className={cl.bioBlock}>
                            <div className={cl.bioHead} onClick={e=>setIsBioActive(!isBioActive)}>
                                <span className={cl.bioLine}></span>
                                <h2 className={cl.bioTitle}>
                                    Биография {stateActor.sex ? stateActor.sex === 'MALE' ? 'Актера' : 'Актрисы' : '-'}:
                                </h2>
                            </div>
                            <div ref={bioBody} className={cl.bioBody}>
                                <p ref={bioDescr} className={cl.bioDescr}>
                                    {allLoading&&replacerComments(stateGenInfo.article, '=', <br />)}
                                </p>
                                <span className={isBioActive ? [cl.overlay, cl.overlayActive].join` ` : cl.overlay}></span>
                            </div>
                        </div>
                        

                    </div>
                </div>
            </div>
            <div className={cl.filmsActor}>
                            <h2 className={cl.filmsTitle}>Фильмы с участием актера:</h2>
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={5}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                className={cl.swiper}
                            >
                                {isLoading&&stateActor.films.filter(e=>e.rating).sort((a,b)=>b.rating-a.rating).filter((e,i)=>i<=14).map((e,i)=>{
                                    return (
                                      
                                        <SwiperSlide key={e.id} className={cl.slide}>
                                            <Link href={'/movies/'+e.id}>
                                            <li className={cl.itemSimilar} key={i}>
                                                <span className={[cl.ratingSimilar, getColorRating(e.rating)].join` `}>{`${e.rating}`.slice(0,3)}</span>
                                                <img src={`https://kinopoiskapiunofficial.tech/images/posters/kp/${e.filmId}.jpg`} alt="" className={cl.imgSimilarBack}/>
                                                <img src={`https://kinopoiskapiunofficial.tech/images/posters/kp/${e.filmId}.jpg`} alt="" className={cl.imgSimilar}/>
                                                <div className={cl.bottomItemSimilar}>
                                                    <p className={cl.nameRu}>{e.nameRu}</p>
                                                    <div className={cl.infoSimilar}>
                                                        {/* <span className={cl.similarDescr}>{e.year}, </span>
                                                        <span className={cl.similarDescr}>{e.genres.filter((e,i)=>i<2).join`, `}, </span>
                                                        <span className={cl.similarDescr}>{e.counties[0]}</span> */}
                                                    </div>
                                                </div>
                                            
                                            </li>
                                            </Link>                                        
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                            <ul className={cl.filmsList}>
                               
                            </ul>
                        </div>
        </div>
    </section>
  )
}
