import React, { useEffect } from 'react'
import cl from './HeroComp.module.css'

import Link from 'next/link'
import {getColorRating} from 'src/untils/getColorRating';
export default function HeroItem({rating,title,img,year,genre,country,id, inView}) {
   
    return (
        <div className={inView? [cl.heroItem, cl.heroActive].join` ` : cl.heroItem}>
            <div className={cl.itemBackImg} >
                <img className={cl.itemBack} src={img}/>
            </div>
            <div className={cl.itemGradient}>

            </div>
        
            <div className={cl.itemWrapper}>
                <div className="container">
                    <div className={cl.itemContent}>
                        <div className={cl.itemBlock}>

                            <Link href={'/movie/'+id}>
                                <img className={cl.itemPoster} src={img}/>

                            </Link>
                            {/* <p className={cl.nameEng}><span>{title}</span></p> */}
                            <h1 className={cl.itemName}>{title}</h1>
                            <div className={cl.bottomTitle}>
                                <span className={[cl.bottomText, getColorRating(rating), cl.ratingText].join` `}>{rating}</span>
                                <span className={cl.bottomText}>{year},</span>
                                <span className={cl.bottomText}>{country},</span>
                                <span className={cl.bottomText}>{genre}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
