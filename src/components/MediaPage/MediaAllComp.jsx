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
import {getTopsAPI} from './../../untils/API/getTopsAPI';
import { setStateTops } from 'redux/topsState-reducer';


export default function MediaAllComp() {
    const dispatch = useDispatch()

    const [stateNews,setStateNews] = useState([])
    const [stateNewsN,setStateNewsN] = useState([])
    const statetops = useSelector((state)=>state['Tops state'])

    const [stateVideos,setStateVideos] = useState([1,1,1,,1,1,1,1,1,1,1,1,1,1,1,,1,1,1,1,1,1,1])
    const [isLoading, setIsLoading] = useState(false)
    const [stateArticles, setStateArticles] = useState([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])
    const [stateArticlesN,setStateArticlesN] = useState([])



    useEffect(()=>{
        const response = getNewsAPIjs('page=1');
        const response2 = getNewsAPIjs('page=2');
        const response3 = getNewsAPIjs('page=3');
        const response4 = getNewsAPIjs('page=4');


        

        response.then((data)=>{
            setStateNews([...stateNews, ...data].filter((e)=>e.coverUrl!==''))
        })
        response2.then((data)=>{
            setStateNewsN([...stateNewsN, ...data].filter((e)=>e.coverUrl!==''))
        })
        response3.then((data)=>{
            setStateArticles([...stateArticles, ...data])
        }) 
        response4.then((data)=>{
            setStateArticlesN([...stateArticlesN, ...data])
        })
        const getStateTops = getTopsAPI();
        getStateTops.then((data)=>{
            dispatch(setStateTops(data))
        })
       

    },[])
    useMemo(()=>{
        if (stateNews.length) {
            console.log(stateNews)
            setIsLoading(true)
        }
    },[stateNews])

    const [stateArrNews, setStateArrNews] = useState(0);

  return (
    <div className={cl.allComp}>
        <div className={cl.newsAllBlock}>
            <MyTitleComp classTitle={cl.tabsTitle} isCenter={false} >Новости кино</MyTitleComp>
            <div className={cl.newsAllListBlock}>
                <ul className={cl.newsAllList}>
                    {
                        isLoading&&[...stateNews, ...stateNewsN].filter((e,i)=>i<=17).map((e,i)=>{
                            return (
                                <React.Fragment key={i}>
                                   
                                  <MediaNewsItem descr={e.title} index={i} img={e.coverUrl}/>
                                   
                                </React.Fragment>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
        {/* <div className={cl.videosAllBlock}>
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
        </div> */}
        <div className={cl.articlesAllBlock}>
            <MyTitleComp classTitle={cl.tabsTitle} isCenter={false} >Интересные статьи для вас</MyTitleComp>
            <div className={cl.articlesAllListBlock}>
                <ul className={cl.articlesAllList}>
                    {[...stateArticlesN, ...statetops].filter((e,i)=>i<=24).map((e,i)=>{
                        return (
                            <React.Fragment key={i}>
                                <Link href={'/event/'+e.id} className={cl.allLinkArticles}>
                                    <MediaArticlesItem views={e.pageViewsCount} likes={e.likes} description={e.description}/>
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
