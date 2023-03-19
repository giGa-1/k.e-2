import React, { useEffect } from 'react'
import cl from './EventPage.module.css'
import {getTopsAPI} from './../../untils/API/getTopsAPI';
import { setStateTops } from 'redux/topsState-reducer';
import { useDispatch, useSelector } from 'react-redux';

export default function EventPage({id}) {
    const stateTops = useSelector(state=>state['Tops state']);
    const infoState = stateTops.filter(e=>e.id==id)[0];
    const dispatch = useDispatch()

    useEffect(()=>{
        const getStateTops = getTopsAPI();
        getStateTops.then((data)=>{
            dispatch(setStateTops(data))
        })
    },[])
    
    console.log(infoState)
  return (
    <div className={cl.section}>
        <div className="miniCont">
            <div className={cl.titleBlock}>
                <h2 className={cl.title}>{infoState!==undefined&& infoState.suites[0].title}</h2>
                <div className={cl.othertitle}>
                    <div className={cl.likesBlock}>
                        <span className={cl.likeImg}>

                        </span>
                        <span className={cl.likeText}>
                            {infoState!==undefined&&infoState.likes}
                        </span>
                    </div>
                    <div className={cl.viewsBlock}>
                        <span className={cl.viewsImg}>

                        </span>
                        <span className={cl.viewsText}>
                            {infoState!==undefined&&infoState.pageViewsCount}
                        </span>
                    </div>
                </div>
            </div>
            <p className={cl.descr}>
                {infoState!==undefined&&infoState.description}
            </p>
        </div>
    </div>
  )
}
