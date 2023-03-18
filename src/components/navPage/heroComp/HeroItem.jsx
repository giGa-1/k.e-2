import React, { useEffect } from 'react'
import cl from './HeroComp.module.css'

import Link from 'next/link'
import {getColorRating} from 'src/untils/getColorRating';
export default function HeroItem({infoObj, inView}) {
   
    console.log(infoObj)
    return (
        <div className={inView? [cl.heroItem, cl.heroActive].join` ` : cl.heroItem}>
            <div className={cl.itemBackImg} style={{'backgroundImage': infoObj.posterUrl }}>
                <img className={cl.itemBack} src={infoObj.posterUrl}/>
            </div>
            <div className={cl.itemGradient}>

            </div>
        
            <div className={cl.itemWrapper}>
                <div className="container">
                    <div className={cl.itemContent}>
                        <div className={cl.itemBlock}>

                            <Link href={'/movie/'+infoObj.id}>
                                <img className={cl.itemPoster} src={infoObj.posterUrl}/>

                            </Link>
                            <p className={cl.nameEng}>{infoObj.nameOriginal},<span>{infoObj.countries[0]!==undefined&&infoObj.countries[0].country}</span></p>
                            <h1 className={cl.itemName}>{infoObj.nameRu}</h1>
                            <div className={cl.bottomTitle}>
                                <span className={[cl.bottomText, getColorRating(infoObj.ratingImdb), cl.ratingText].join` `}>{infoObj.ratingImdb}</span>
                                <span className={cl.bottomText}>{infoObj.year},</span>
                                <span className={cl.bottomText}>{infoObj.filmLength},</span>
                                <span className={cl.bottomText}>{infoObj.genres.map(e=>e.genre).join`, `}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
