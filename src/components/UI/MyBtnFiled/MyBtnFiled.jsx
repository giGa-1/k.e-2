import React from 'react'
import cl from './MyBtnFiled.module.css'

export default function MyBtnFiled({classBtn, handleFunc,children, ...props}) {
  return (
    <button  className={[classBtn,cl.btn].join` `} onClick={e=>{handleFunc()}} {...props}>
        <span className={cl.leftThing}></span><span className={cl.textBtn}>{children}</span>
    </button>
  )
}
