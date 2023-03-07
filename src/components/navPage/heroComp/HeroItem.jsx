import React, { useEffect } from 'react'
import cl from './HeroComp.module.css'

export default function HeroItem({infoObj}) {
   
    console.log(infoObj)
    return (
        <div className={cl.heroItem}>
            <div className={cl.itemBackImg} style={{'backgroundImage':infoObj.posterUrl }}>

            </div>
            <div className={cl.itemGradient}>

            </div>
        
            <div className={cl.itemWrapper}>
                <div className="container">
                    <div className={cl.itemContent}>
                        <div className={cl.itemBlock}>
                            <img className={cl.itemPoster} src={infoObj.posterUrl}/>
                            <p className={cl.nameEng}>{infoObj.nameOriginal},<span>{infoObj.countries[0]!==undefined&&infoObj.countries[0].country}</span></p>
                            <h1 className={cl.itemName}>{infoObj.nameRu}</h1>
                            <div className={cl.bottomTitle}>
                                <span className={cl.bottomText}>{infoObj.ratingImdb},</span>
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
