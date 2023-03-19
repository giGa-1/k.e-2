import React from 'react'
import cl from './FocusComp.module.css'

export default function FocusCompItem({title, img}) {
  return (
    <li className={cl.item}>
        <img src={img} className={cl.img}/>
        <h3 className={cl.titleItem}>
            {title.slice(0, 35)}...
        </h3>
    </li>
  )
}
