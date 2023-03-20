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
            <span className={cl.arrowCircleLeft} onClick={event=>changePageVideos(event, 0)}>
              <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#f1f1f1" strokeWidth="2"/>
              <path d="M8 12L16 12" stroke="#f1f1f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 9L8.08704 11.913V11.913C8.03897 11.961 8.03897 12.039 8.08704 12.087V12.087L11 15" stroke="#f1f1f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className={cl.countPage}>{isPage}</span>
            <span className={cl.arrowCircleRight} onClick={event=>changePageVideos(event, 1)}>
            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#f1f1f1" strokeWidth="2"/>
              <path d="M8 12L16 12" stroke="#f1f1f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 9L8.08704 11.913V11.913C8.03897 11.961 8.03897 12.039 8.08704 12.087V12.087L11 15" stroke="#f1f1f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
        </div>
        </div>
  )
}
