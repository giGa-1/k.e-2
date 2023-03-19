import React from 'react'
import cl from './../styles/BigSwiperList.module.css';
import Link from 'next/link'

import {getColorRating} from './../untils/getColorRating';
export default function BigSwiperItem({img, title,titleEn = false,country, rating,genre,year,descr, idFilm }) {
  return (
    <Link href={'/movies/'+idFilm} className={cl.linkItem}>
      <li className={cl.item}>
      <span className={[cl.rating, getColorRating(+(rating+'').slice(0,3))].join` `}>{+(rating+'').slice(0,3)}</span>
          {/* <div className={cl.upperImg}>
              <span className={cl.upperText}>
                  {descr}
              </span>
          </div> */}
        
            <img src={img} className={cl.imgitem} />
        
          <div className={cl.itemBottom}>

            <div className={cl.itemBottomHead}>
            <span className={cl.titleItem}>{title}</span>
            </div>
            <div className={cl.itemBottomFooter}>
                {/*  */}
               
                <span className={cl.genre}>{genre},</span>
                <span className={cl.genre}>{country},</span>
                <span className={cl.year}>{year}</span>
            </div>
              
          </div>
      </li>
    </Link>
  )
}
