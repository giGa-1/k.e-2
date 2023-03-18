import React, {useEffect, useState, useMemo} from 'react';
import MediaVideoItem from './MediaVideoItem';
import cl from './MediaComp.module.css';


export default function MediaVideosComp() {
    const [stateVideos,setStateVideos] = useState([1,1,1,,1,1,1,1,1,1,1,1,1,1,1,,1,1,1,1,1,1,1])
    const [isPage, setIsPage] = useState(1);

    const changePageVideos = (e, isChange)=> {
        e.preventDefault();
        setIsPage(isChange ? isPage!==0&&isPage-1 : isPage+1)
    }
  return (
    <div className={cl.videosAllBlock}>
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
        <div className={cl.pagination}>
            <span className={cl.arrowCircleLeft} onChange={e=>changePageVideos(e)}></span>
            <span className={cl.countPage}>{isPage}</span>
            <span className={cl.arrowCircleRight} onChange={e=>changePageVideos(e)}></span>
        </div>
    </div>
  )
}
