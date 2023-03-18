import React, {useEffect, useState, useMemo} from 'react';
import MediaArticlesItem from './MediaArticlesItem';
import Link from 'next/link';
import cl from './MediaComp.module.css';


export default function MediaArticlesComp() {
    const [isLoading, setIsLoading] = useState(false)
    const [stateArticles, setStateArticles] = useState([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])
  const [isPage, setIsPage] = useState(1);

    const changePageVideos = (e, isChange)=> {
        e.preventDefault();
        setIsPage(isChange ? isPage-1 : isPage+1)
    }
  return (
    <div className={cl.articlesAllBlock}>
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
              <div className={cl.pagination}>
            <span className={cl.arrowCircleLeft} onChange={e=>changePageVideos(e, 0)}></span>
            <span className={cl.countPage}>{isPage}</span>
            <span className={cl.arrowCircleRight} onChange={e=>changePageVideos(e, 1)}></span>
        </div>
        </div>
  )
}
