import React from 'react'
import cl from './Footer.module.css'
import { useSelector } from 'react-redux'

export default function Footer() {
    const stateInfo = useSelector(state=>state['Footer Info'])
  return (
    <footer className={cl.footer}>
        <div className="container">
            <div className={cl.content}>
                {[{idColumn:0,list:'title'}, ...stateInfo].map(e=>{
                    return (
                        <React.Fragment key={e.idColumn}>
                            {
                                e.idColumn == 0 ? 
                                    <div className={cl.logoBlock}>
                                        <span className={cl.logo}>
                    
                                        </span>
                                        <a href="mailto:info@kino-effect.com" className={cl.linkLogo}>info@kino-effect.com</a>
                                        <div className={cl.contact}>
                                            <span className={cl.sendText}>Напишите нам:</span>
                                            <span className={cl.wp}></span><span className={cl.tg}></span> 
                                        </div>
                                    </div>
                                :
                                <div className={cl.navblock}>
                                    {e.list.map(el=>{
                                        return (
                                            <React.Fragment key={el.idCell}>
                                                <div className={cl.blockList}>
                                                    <h3 className={cl.title}>
                                                        {el.title}
                                                    </h3>
                                                    <ul className={cl.list}>
                                                        {el.listRows.map(e=><p className={cl.link}>{e.text}</p>)}
                                                    </ul>
                                                </div>
                                            </React.Fragment>
                                        )
                                    })}
                                    
                                </div>
                            }
                        </React.Fragment>
                    )
                })}
            </div>
            <div className={cl.foot}>
                <p>© Все права защищены 2023</p>
                <p>Политика конфеденциальности</p>
            </div>
        </div>
    </footer>
  )
}
