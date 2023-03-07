import React, {useEffect, useState, useMemo} from 'react'
import { getOfficialYandexMovies } from 'src/untils/API/getOfficialYandexMovies';
import {setInfoActorState} from './../../../redux/ActorState-reducer'
import cl from './ActorPage.module.css';

import {useSelector, useDispatch} from 'react-redux'

export default function ActorPage({idActor}) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const stateActor = useSelector(state=>state['Actor State']).infoObj
    useMemo(()=>{
        Object.values(stateActor).length&&setIsLoading(true)
    },[stateActor])

    console.log(idActor)
    useEffect(()=>{
        const officialHeroData = getOfficialYandexMovies('/v1/person/'+idActor, setInfoActorState, dispatch, null);
    },[])


  return (
    <section className={cl.section}>
        <div className="container">
            <div className={cl.content}>
                <div className={cl.leftContent}>
                    <div className={cl.imgBLockActor}>
                        <img src={''}  />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
