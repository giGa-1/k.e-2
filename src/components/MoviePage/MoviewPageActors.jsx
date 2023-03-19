import React from 'react'
import cl from './MoviePage.module.css'

export default function MoviewPageActors({imgSrc='/img/unknownActor.svg', title='Tom Hanks', descr}) {
  return (
    <li className={cl.itemActor}>
        <img src={imgSrc} className={cl.imgActor}/>
        <div className={cl.titleBlock}>
            <h3 className={cl.title}>{title}</h3>
            <p className={cl.role}>{descr}</p>
        </div>
    </li>
  )
}
