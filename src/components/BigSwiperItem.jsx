import React from 'react'
import cl from './../styles/BigSwiperList.module.css';
import Link from 'next/link'
import {getColorRating} from './../untils/getColorRating';
export default function BigSwiperItem({img, title,titleEn = false, rating,genre,year,descr, idFilm }) {
  return (
    <Link href={'/movies/'+idFilm} className={cl.linkItem}>
      <li className={cl.item}>
      <span className={[cl.rating, getColorRating(rating)].join` `}>{rating}</span>
          <div className={cl.upperImg}>
              <span className={cl.upperText}>
                  {descr}
              </span>
          </div>
        
            <img src={img} className={cl.imgitem} />
        
          <div className={cl.itemBottom}>
            <div className={cl.itemBottomHead}>
                {!titleEn ? '' : <span className={cl.itemEnTitle}>{titleEn}</span>}
            </div>
            <div className={cl.itemBottomFooter}>
                {/*  */}
                <span className={cl.titleItem}>{title},</span>
                {/* <span className={cl.genre}>{genre}</span> */}
                <span className={cl.year}>{year}</span>
            </div>
              
          </div>
      </li>
    </Link>
  )
}
