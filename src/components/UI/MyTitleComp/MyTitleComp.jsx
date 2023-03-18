import React from 'react'
import cl from './MyTitleComp.module.css';
import { useInView } from 'react-intersection-observer';

export default function MyTitleComp({children, classTitle,isCenter=false,additionlySvg=false  , ...props}) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  return (
    <div className={isCenter ? [cl.block, cl.center].join` ` :cl.block}>
        <h2 ref={ref} className={ inView ? [cl.title,classTitle,cl.active].join` ` : [cl.title,classTitle].join` `}>{children}   <span className={!additionlySvg ? [cl.svgTitle].join` ` : [cl.svgTitle, additionlySvg].join` `}></span></h2>
    </div>
  )
}
