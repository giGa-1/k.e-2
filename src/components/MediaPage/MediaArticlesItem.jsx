import React, {useEffect, useState, useMemo} from 'react';
import cl from './MediaComp.module.css';
import { useInView } from 'react-intersection-observer';

export default function MediaArticlesItem({views,description = 'Lorem ipsum asfdads sdfasdf asdafd asdl; asp[qowe asdiuo uoidusa oiuas asd uiods asdoiuas aspdoap[s disod asoid sdioaa as is sdisda as d dsa  asd as ds asdaasdas asdas', likes = 2, date =  '13:00 17.03.2023'}) {
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: .2,
      });
    return (
    <li ref={ref} className={ inView ? [cl.articlesAllItem, cl.articlesAllItemActive].join` ` :cl.articlesAllItem}>
        <p className={cl.articlesAllDescr}>
            {description.slice(0,200)}...
        </p>
        <div className={cl.articlesAllBottom}>
        
            <div className={cl.articlesAllLikes}>
            
                <span className={cl.articlesAllLikeSvg}>
                    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>      
                </span>
                {likes }
            </div>
            <span className={cl.articlesAllDate}>
                {views}
            </span>
        </div>
    </li>
  )
}
