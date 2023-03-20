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
        // const response3 = getNewsAPIjs('page=3');
        // const response4 = getNewsAPIjs('page=4');


        

        response.then((data)=>{
            setStateNews([...stateNews, ...data].filter((e)=>e.coverUrl!==''))
        })
        response2.then((data)=>{
            setStateNewsN([...stateNewsN, ...data].filter((e)=>e.coverUrl!==''))
            setIsLoading(true)
        })
        // response3.then((data)=>{
        //     setStateArticles([...stateArticles, ...data])
        // }) 
        // response4.then((data)=>{
        //     setStateArticlesN([...stateArticlesN, ...data])
        // })
        const getStateTops = getTopsAPI();
        getStateTops.then((data)=>{
            dispatch(setStateTops(data))
            setStateArticles(data)
        })
       

    },[])
 

    const [stateArrNews, setStateArrNews] = useState(0);

  return (
    <div className={cl.allComp}>
          <div className={!isLoading ? ["loaderBLock", "loaderActive"].join` ` :"loaderBLock"}>
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
        <div className={cl.newsAllBlock}>
            <MyTitleComp classTitle={cl.tabsTitle} isCenter={false} >Новости кино</MyTitleComp>
            <div className={cl.newsAllListBlock}>
                <ul className={cl.newsAllList}>
                    {
                        isLoading&&[...stateNews, ...stateNewsN].filter(e=>Object.keys(e).length !== 0).filter((e,i)=>i<=17).map((e,i)=>{
                            return (
                                <React.Fragment key={i}>
                                   
                                  <MediaNewsItem descr={e.title} index={i} href={'/news/'+e.date} img={e.coverUrl}/>
                                   
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
                    {[...statetops, ...stateArticles].filter((e,i)=>i<=24).map((e,i)=>{
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
