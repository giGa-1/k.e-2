import React, {useEffect, useState, useMemo} from 'react';
import MediaArticlesItem from './MediaArticlesItem';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import cl from './MediaComp.module.css';
import {getTopsAPI} from './../../untils/API/getTopsAPI';
import { setStateTops } from 'redux/topsState-reducer';


export default function MediaArticlesComp() {
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const statetops = useSelector((state)=>state['Tops state'])

  const [isPage, setIsPage] = useState(1);

  useEffect(()=>{
    const getStateTops = getTopsAPI();
    getStateTops.then((data)=>{
        dispatch(setStateTops(data))
    })
  },[])

    const changePageVideos = (e, isChange)=> {
        e.preventDefault();
        console.log(isChange)
        window.scrollTo({behavior:'smooth',top:0})
        setIsPage(isChange ? isPage+1 : isPage-1)
    }
  return (
    <div className={cl.articlesAllBlock}>
            <div className={cl.articlesAllListBlock}>
                <ul className={cl.articlesAllList}>
                    {statetops.filter((e,i)=>i>(25*(isPage-1))&&i<=(25*isPage)).map((e,i)=>{
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
              <div className={cl.pagination}>
            <span className={cl.arrowCircleLeft} onClick={event=>changePageVideos(event, 0)}></span>
            <span className={cl.countPage}>{isPage}</span>
            <span className={cl.arrowCircleRight} onClick={event=>changePageVideos(event, 1)}></span>
        </div>
        </div>
  )
}
