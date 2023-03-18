import React from 'react'
import cl from './CompilationComp.module.css';

export default function CompilationItem({img, title, rating, year, }) {
  return (
    <li className={cl.itemComp}>
        <div className={cl.leftBlock}>
            <img src={img} alt="" className={cl.imgItem}/>
        </div>
        <div className={cl.rightBlock}>
            <div className={cl.titleBlock}>
                <h3 className={cl.titleItem}>
                    {title}
                </h3>
                <span className={cl.rating}>
                    
                </span>
            </div>
          

        </div>
    </li>
  )
}
