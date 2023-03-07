import React from 'react'
import cl from './MyTitleComp.module.css';

export default function MyTitleComp({children, classTitle,isCenter=false, additionlySvg=false  , ...props}) {
  return (
    <div className={isCenter ? [cl.block, cl.center].join` ` :cl.block}>
        <h2 className={[cl.title,classTitle].join` `}>{children}   <span className={!additionlySvg ? [cl.svgTitle].join` ` : [cl.svgTitle, additionlySvg].join` `}></span></h2>
     
    </div>
  )
}
