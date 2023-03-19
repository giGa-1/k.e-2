import React from 'react'
import cl from './CompilationComp.module.css';
import { getColorRating } from '../../untils/getColorRating';
import Link from 'next/link';

export default function CompilationItem({img,id,title,votes, rating, year,index,genre,country,...props }) {
    return (
        <Link href={'/movies/'+id}>
            <li className={cl.itemComp}>
                <div className={cl.itemCount}>
                    {index}.
                </div>

                <div className={cl.itemInfo}>
                    <div className={cl.leftBlock}>
                        <img src={img} alt="" className={cl.imgItem}/>
                    </div>
                    <div className={cl.rightBlock}>
                            <div className={[cl.rating].join` `}>
                                <span className={cl.votes}>
                                    {votes} - 
                                </span>
                                {(rating+'').slice(0,3)}
                            </div>
                        <div className={cl.titleBlock}>
                            <h3 className={cl.titleItem}>
                                {title}
                            </h3>
                        
                        </div>
                        <div className={cl.bottomBlock}>
                            <span className={cl.yearText}>{year},</span>
                            <span className={cl.genreText}>{genre},</span>
                            <span className={cl.countryText}>{country}</span>

                        </div>
                    </div>
                </div>
            </li>
        </Link>
    
  )
}
