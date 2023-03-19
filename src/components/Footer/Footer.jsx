import React from 'react'
import cl from './Footer.module.css'
import { useSelector } from 'react-redux'

import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

export default function Footer() {
    const stateInfo = useSelector(state=>state['Footer Info'])
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0.2,
      });
      const [ refFoot, inViewFoot ] = useInView({
        /* Optional options */
        threshold: 0,
      });
  

  return (
    <footer ref={ref} className={inView? [cl.footer, cl.activeFooter].join` ` : cl.footer}>
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

                                                    <Link href={el.href}>
                                                        <h3 className={cl.title}>
                                                            {el.title}
                                                        </h3>
                                                    </Link>
                                                    <ul className={cl.list}>
                                                        {el.listRows.map((e,i)=>
                                                            <Link key={i} href={e.href}><p className={cl.link}>{e.text}</p></Link>
                                                        )}
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

                <div ref={refFoot} className="">
                <div  className={inViewFoot ? [cl.foot, cl.footActive].join` ` : cl.foot}>
                    <p>© Все права защищены 2023</p>
                    <p>Политика конфеденциальности</p>
                </div>
                </div>
              
          
           
        </div>
    </footer>
  )
}
