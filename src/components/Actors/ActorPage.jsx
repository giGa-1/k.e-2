import React, {useEffect, useState, useMemo} from 'react'

import { getActorKinopoisk } from 'src/untils/API/getActorKinopoisk';

import {setInfoActorState} from './../../../redux/ActorState-reducer'
import cl from './ActorPage.module.css';

import {useSelector, useDispatch} from 'react-redux'

import { GetBestMoviesActor } from '../../untils/GetBestMoviesActor';
import Link from 'next/link';
import { getColorRating } from '../../untils/getColorRating';
import { getActorUnOAPI } from '../../untils/API/getActorUnOAPI';


export default function ActorPage({idActor}) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [isFav, setIsFav] = useState(false)
    const stateActor = useSelector(state=>state['Actor State']).infoObj
  


    console.log(idActor,stateActor)
    useEffect(()=>{
        const officialHeroData = getActorUnOAPI(idActor);
        officialHeroData.then(data=>{
            console.log(data)
            dispatch(setInfoActorState(data));
            setIsLoading(true);

        })

    },[])

    console.log(stateActor)

    const setFav = (e)=>{
        e.preventDefault();
        setIsFav(!isFav)
    }
    

  return (
    <section className={cl.section}>
        <div className="container">
            <div className={cl.content}>
                <div className={cl.leftContent}>
                    <div className={cl.imgBLockActor}>

                        <img src={isLoading&&stateActor.posterUrl}  className={cl.actorImg}/>
                    </div>
                    {/* <div className={isFav ? [cl.favBlock, cl.activeFav].join` ` : cl.favBlock} onClick={e=>setFav(e)}>
                        <span className={cl.textFav}>
                            В Избранное
                        </span>
                        <span className={cl.favIcon}>

                        </span>
                    </div> */}
                    <div className={cl.funFacts}>
                        {isLoading? 
                        stateActor.facts.length ? 
                        <div className={cl.factBlock}>
                            <h3 className={cl.titleFact}>Интересные факты:</h3>
                            <ul className={cl.listFacts}>
                                {
                                    stateActor.facts.filter((e,i)=>i<=3).map((e,i)=>{
                                        return (
                                            <React.Fragment key={i}>
                                                <li className={cl.factText}>
                                                    {e}
                                                </li>
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </ul>
                          
                        </div>
                       
                        :''
                        :''}
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
                        <div className={cl.factsBLock}>

                        </div>
                        <div className={cl.filmsActor}>
                            <h2 className={cl.filmsTitle}>Фильмы с участием актера:</h2>
                            <ul className={cl.filmsList}>
                                {isLoading&&stateActor.films.filter(e=>e.rating).sort((a,b)=>b.rating-a.rating).filter((e,i)=>i<=14).map((e,i)=>{
                                    return (
                                        <Link key={i} href={'/movies/'+e.filmId}>
                                            <li className={cl.filmsItem}>
                                                <div className={cl.headerBlock}>
                                                    <p className={cl.headName}>{e.nameEn}</p>
                                                    <h3 className={cl.titleFilm}>{e.nameRu}
                                                    <span className={[cl.ratingFilm, getColorRating(e.rating)].join` `}>
                                                        {e.rating}
                                                    </span>
                                                    </h3>
                                                </div>
                                            </li>
                                        </Link>
                                    )
                                })}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
