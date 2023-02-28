import React from 'react'
import cl from './Compilation.module.css';


export default function CompilationItem({top, id, title}) {
  return (
    <li className={cl.itemComlp}>
     
        <h3 className={cl.top}>{top}</h3>
        <p className={cl.titleItem}>{title}</p>
    
    </li>
  )
}
