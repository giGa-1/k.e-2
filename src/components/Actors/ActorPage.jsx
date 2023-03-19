import React, {useEffect, useState, useMemo} from 'react'

import { getActorKinopoisk } from 'src/untils/API/getActorKinopoisk';

import {setInfoActorState} from './../../../redux/ActorState-reducer'
import cl from './ActorPage.module.css';

import {useSelector, useDispatch} from 'react-redux'

import { GetBestMoviesActor } from '../../untils/GetBestMoviesActor';
import Link from 'next/link';
import { getColorRating } from '../../untils/getColorRating';


export default function ActorPage({idActor}) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const stateActor = useSelector(state=>state['Actor State']).infoObj
    useMemo(()=>{
        Object.values(stateActor).length&&setIsLoading(true)
    },[stateActor])


    console.log(idActor,stateActor)
    useEffect(()=>{
        const officialHeroData = getActorKinopoisk('/v1/person/'+idActor, setInfoActorState, dispatch, null);
    },[])

    const bestMovieActor = isLoading ? GetBestMoviesActor(stateActor.movies, 9): []
    

  return (
    <section className={cl.section}>
        <div className="container">
            <div className={cl.content}>
                <div className={cl.leftContent}>
                    <div className={cl.imgBLockActor}>

                        <img src={isLoading&&stateActor.photo}  className={cl.actorImg}/>
                    </div>
                    <div className={cl.favBlock}>
                        <span className={cl.textFav}>
                            В Избранное
                        </span>
                        <span className={cl.favIcon}>

                        </span>
                    </div>
                </div>
                <div className={cl.rightBlock}>
                    <div className={cl.tabsTextBlock}>
                        <p className={cl.nameEnActor}>{isLoading&&stateActor.name}</p>
                        <h1 className={cl.nameActor}>
                            {isLoading&&stateActor.enName}
                        </h1>
                    </div>
                    <div className={cl.bottomBlock}>
                        <ul className={cl.listInfoActor}>
                            <li className={cl.itemAboutActor}>
                                <span className={cl.itemLeft}>
                                    Рост
                                </span>
                                <span className={cl.itemRight}>
                                    {isLoading&&stateActor.growth ? stateActor.growth : '-'}
                                </span>
                            </li>
                            <li className={cl.itemAboutActor}>
                                <span className={cl.itemLeft}>
                                    Пол
                                </span>
                                <span className={cl.itemRight}>
                                    {isLoading&&stateActor.sex ? stateActor.sex : '-'}
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
                                    {isLoading&&stateActor.birthPlace ? `${stateActor.birthPlace[0].value}, ${stateActor.birthPlace[stateActor.birthPlace.length-1].value}` : '-'}
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
                                    {isLoading&&stateActor.profession ? stateActor.profession.map(e=>e.value).join`, ` : '-'}
                                </span>
                            </li>
                        </ul>
                        <div className={cl.filmsActor}>
                            <h2 className={cl.filmsTitle}>Смотрите также:</h2>
                            <ul className={cl.filmsList}>
                                {bestMovieActor.map((e,i)=>{
                                    return (
                                        <Link key={i} href={'/movies/'+e.id}>
                                            <li className={cl.filmsItem}>
                                                {e.name}
                                                <span className={[cl.ratingFilm, getColorRating(e.rating)].join` `}>
                                                {e.rating}
                                                </span>
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
