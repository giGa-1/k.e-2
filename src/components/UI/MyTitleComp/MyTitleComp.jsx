import React from 'react'
import cl from './MyTitleComp.module.css';

export default function MyTitleComp({children, classTitle, additionlySvg=false  , ...props}) {
  return (
    <div className={cl.block}>
        <h2 className={[cl.title,classTitle].join` `}>{children}   <span className={!additionlySvg ? [cl.svgTitle, cl.arrow].join` ` : [cl.svgTitle, additionlySvg].join` `}></span></h2>
     
    </div>
  )
}
