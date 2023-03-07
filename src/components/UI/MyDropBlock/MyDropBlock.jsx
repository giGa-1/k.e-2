import React from 'react'
import cl from './MyDropBlock.module.css'

export default function MyDropBlock({headContent,bodyContent, isDrop, setIsDrop, headClass,bodyClass}) {
  return (
    <div className={cl.blockSelect}>
        <div className={[cl.headSelect,headClass].join` `} onClick={e=>setIsDrop(!isDrop)}>
            {headContent}
        </div>
        <div className={isDrop ? [cl.bodySelect, bodyClass,cl.activeSelect].join` ` :[cl.bodySelect,bodyClass].join` `}>
            <div className={cl.bodyContent}>
                {bodyContent}         
            </div>
        </div>
    </div>
  )
}
