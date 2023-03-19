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
