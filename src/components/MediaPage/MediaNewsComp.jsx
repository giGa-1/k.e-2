import React, {useEffect, useState, useMemo} from 'react';

import cl from './MediaComp.module.css';
import MediaNewsItem from './MediaNewsItem';
import { getNewsAPIjs } from 'src/untils/API/getNewsAPI';

export default function MediaNewsComp() {
    const [stateNews,setStateNews] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{

        const response = getNewsAPIjs('page=1');

        response.then((data)=>{
            setStateNews([...stateNews, data])
        })

    },[])
    useMemo(()=>{
        if (stateNews.length>2) {
            console.log(stateNews)
            setIsLoading(true)
        }
    },[stateNews])
  return (
    <div className={cl.newsComp}>
         <div className={cl.newsAllBlock}>
            <div className={cl.newsAllListBlock}>
                <ul className={cl.newsAllList}>
                    {
                        isLoading&&stateNews.filter((e,i)=>i<=33).map((e,i)=>{
                            return (
                                <React.Fragment key={i}>
                                    <MediaNewsItem descr={e.title} img={e.coverUrl} index={i}/> 
                                </React.Fragment>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}
