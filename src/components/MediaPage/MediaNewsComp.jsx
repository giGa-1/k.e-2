import React, {useEffect, useState, useMemo} from 'react';

import cl from './MediaComp.module.css';
import MediaNewsItem from './MediaNewsItem';
import { getNewsAPIjs } from 'src/untils/API/getNewsAPI';

export default function MediaNewsComp() {
    const [stateNews,setStateNews] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        const dataNews = getNewsAPIjs();
        dataNews.then(res=>setStateNews(res))
    },[])
  return (
    <div className={cl.newsComp}>
         <div className={cl.newsAllBlock}>
            <div className={cl.newsAllListBlock}>
                <ul className={cl.newsAllList}>
                    {
                        stateNews.filter((e,i)=>i<=33).map((e,i)=>{
                            return (
                                <React.Fragment key={i}>
                                   
                                  <MediaNewsItem descr={e.suites[0].title} index={i}/>
                                   
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
