import React from 'react'
import cl from './MoviesComp.module.css'
import Link from 'next/link'

export default function MoviesCompItem({img, title, rating,genre,year,descr, idFilm }) {
  console.log(idFilm)
  return (
    <Link href={'/movies/'+idFilm}>
      <li className={cl.item}>

          <div className={cl.upperImg}>
              <span className={cl.upperText}>
                  {descr}
              </span>
          </div>
        
            <img src={img} className={cl.imgitem} />
        
          <div className={cl.itemBottom}>
              {/* <span className={cl.rating}>{rating}</span> */}
              <span className={cl.titleItem}>{title},</span>
              {/* <span className={cl.genre}>{genre}</span> */}
              <span className={cl.year}>{year}</span>
          </div>
      </li>
    </Link>
  )
}
