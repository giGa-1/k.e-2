import React, {useEffect, useState, useMemo} from 'react';
import cl from './MediaComp.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { getNewsAPIjs } from 'src/untils/API/getNewsAPI';
import MyTitleComp from './../UI/MyTitleComp/MyTitleComp'
import ReactPlayer from 'react-player/lazy'
import Link from 'next/link';
import MediaVideoItem from './MediaVideoItem';
import MediaNewsItem from './MediaNewsItem';
import MediaArticlesItem from './MediaArticlesItem';
export default function MediaAllComp() {
    const [stateNews,setStateNews] = useState([])
    const [stateVideos,setStateVideos] = useState([1,1,1,,1,1,1,1,1,1,1,1,1,1,1,,1,1,1,1,1,1,1])
    const [isLoading, setIsLoading] = useState(false)
    const [stateArticles, setStateArticles] = useState([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])

    
    const [stateArrNews, setStateArrNews] = useState(0);
    const dispatch = useDispatch()
    useEffect(()=>{
        const dataNews = getNewsAPIjs();
        dataNews.then(res=>setStateNews(res))
    },[])
    console.log(stateNews)

  return (
    <div className={cl.allComp}>
        <div className={cl.newsAllBlock}>
            <MyTitleComp classTitle={cl.tabsTitle} isCenter={false} >Новости кино</MyTitleComp>
            <div className={cl.newsAllListBlock}>
                <ul className={cl.newsAllList}>
                    {
                        stateNews.filter((e,i)=>i<=17).map((e,i)=>{
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
        <div className={cl.videosAllBlock}>
            <MyTitleComp classTitle={cl.tabsTitle} isCenter={false} >Трейлеры и другие видео</MyTitleComp>
            <div className={cl.videosAllListBlock}>
                <ul className={cl.videosAllList}>
                    {stateVideos.filter((e,i)=>i<=17).map((e,i)=>{
                        return (
                            <React.Fragment key={i}>
                                <MediaVideoItem />
                            </React.Fragment>
                        )
                    })}
                </ul>
            </div>
        </div>
        <div className={cl.articlesAllBlock}>
            <MyTitleComp classTitle={cl.tabsTitle} isCenter={false} >Интересные статьи для вас</MyTitleComp>
            <div className={cl.articlesAllListBlock}>
                <ul className={cl.articlesAllList}>
                    {stateArticles.filter((e,i)=>i<=25).map((e,i)=>{
                        return (
                            <React.Fragment key={i}>
                                <Link href={'/event/'+i} className={cl.allLinkArticles}>
                                    <MediaArticlesItem />
                                </Link>
                                
                            </React.Fragment>
                        )
                    })}
                </ul>
            </div>
        </div>
    </div>
  )
}
