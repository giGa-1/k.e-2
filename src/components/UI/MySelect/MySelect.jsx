import React from 'react'
import cl from './MySelect.module.css'

export default function MySelect({isSelect, setIsSelect, setInfoSelect, infoSelect}) {
  return (
    <div className={cl.blockSelect}>
        <div className={cl.headSelect} onClick={e=>setIsSelect(!isSelect)}>
           {infoSelect.filter(e=>e.active)[0].text}
            <span className={cl.headArrow}>

            </span>
        </div>
        <div className={isSelect ? [cl.bodySelect, cl.activeSelect].join` ` :cl.bodySelect}>
            <div className={cl.bodyContent}>
                <ul className={cl.listBody}>
                    {infoSelect.filter((e,i)=>!e.active).map((e,i)=>{
                        return (
                            <React.Fragment key={i}>
                                <li className={cl.itemSelect} onClick={event=>{setIsSelect(false);setInfoSelect(infoSelect.map(el=>el.id==e.id?{...el,active:true}:{...el,active:false}))}}> 
                                    {e.text}
                                </li>
                            </React.Fragment>
                        )
                    })}
                </ul>    
            </div>            
        </div>
    </div>
  )
}
