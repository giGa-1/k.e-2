import React, {useEffect, useState, useMemo} from 'react';

import cl from './NewsComp.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { setStateTops } from 'redux/topsState-reducer';
import { getNewsAPIjs } from 'src/untils/API/getNewsAPI';


export default function NewsComp({id}) {
    console.log(id);
    const [stateNews,setStateNews] = useState([])
    const [stateNewsN,setStateNewsN] = useState([])

    const [isActiveItem, setIsActiveItem] = useState([])

    useEffect(()=>{
        const response = getNewsAPIjs('page=1');
        const response2 = getNewsAPIjs('page=2');
        

        response.then((data)=>{
            setStateNews([...stateNews, ...data].filter((e)=>e.coverUrl!==''))
        })
        response2.then((data)=>{
            setStateNewsN([...stateNewsN, ...data].filter((e)=>e.coverUrl!==''))
        })
     

    },[])


    useMemo(()=>{
            if(stateNewsN.length && stateNews.length) {
                console.log([...stateNews,...stateNewsN ])
                setIsActiveItem([...stateNews,...stateNewsN ].filter(e=>e.date == id));
                console.log(isActiveItem)
            }
    },[stateNewsN, stateNews])

    return (
    <div className={cl.section}>
        <div className="miniCont">
            <div className={cl.blockImg}>
               
            </div>
            <div className={cl.blockHead}>
                <h1 className={cl.titleNews}>

                {
                     isActiveItem.length ? 
                     isActiveItem[0].title
                     :''
                }
                </h1>
                <span className={cl.date}>{
                    isActiveItem.length ? 
                    isActiveItem[0].date
                    :''
                }</span>
            </div>
            <div className={cl.descrBlock}>
                <p className={cl.descr}>
                {
                     isActiveItem.length ? 
                     isActiveItem[0].text
                     :''
                }
                </p>
            </div>
        </div>
    </div>
  )
}
