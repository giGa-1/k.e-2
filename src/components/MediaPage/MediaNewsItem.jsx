import React, {useEffect, useState, useMemo} from 'react';
import Link from 'next/link';
import cl from './MediaComp.module.css';
import { useInView } from 'react-intersection-observer';


export default function MediaNewsItem({index,href = '/news/12321',img = '/img/test-news.png',date = '13:00 17.05.2023', descr ='' }) {
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: .2,
      });
      console.log(descr);
    return (
    <li ref={ref} className={index===2 ? inView ? [cl.newsAllItem, cl.newsAllBigItem, cl.activeNewsItem].join` `  : [cl.newsAllItem, cl.newsAllBigItem].join` ` : index===9 ? inView ? [cl.newsAllItem, cl.newsAllBigBottom, cl.activeNewsItem].join` ` : [cl.newsAllItem, cl.newsAllBigBottom].join` ` : inView ? [cl.newsAllItem, cl.activeNewsItem].join` ` : cl.newsAllItem}>            
        <Link href={href } className={cl.newsAlllink}>
            <img src={img} alt="" className={cl.newsAllImgItem}/>
            <div className={cl.newsAllTextBlock}>
                <p className={cl.newsAllText}>
                    {index===2 ? descr.slice(0, 127)+`...` : index===9 ? descr.slice(0, 127)+`...` : descr.slice(0, 57)+`...`}
                    
                </p>
                <div className={cl.newsAllInfoNews}>
                    <p className={cl.newsAllDateNews}>{date }</p>
                </div>
            </div>   
        </Link>
        
    </li>
  )
}
