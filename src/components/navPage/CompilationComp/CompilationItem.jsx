import React from 'react'
import cl from './Compilation.module.css';


import { useInView } from 'react-intersection-observer';

export default function CompilationItem({top, id, title}) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  return (
    <li ref={ref} className={inView ? [cl.itemComlp, cl.activeItem].join` ` :cl.itemComlp}>
     
        <h3 className={cl.top}>{top}</h3>
        <p className={cl.titleItem}>{title}</p>
    
    </li>
  )
}
