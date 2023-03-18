import React from 'react'
import cl from './CalendarComp.module.css'

export default function CalendarItem({img = '/img/test-movie.png', title= 'Lorem ipsum swag max gay', titleEn=  ' Lorem ipsun max gay', datePremier = '16 Марта'}) {
  return (
    <li className={cl.calendatItemPremier}>
        <img className={cl.calendarImgPremier} src={img}/>
        <div className={cl.blockItemPremier}>
            <p className={cl.nameEn}>{titleEn}</p>
            <h3 className={cl.nameRu}>{title}</h3>
        </div>
        <span className={cl.datePremier}>
            {datePremier}
        </span>
    </li>
  )
}
