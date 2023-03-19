import React from 'react';
import cl from './Compilation.module.css';
import MyTitleComp from './../../UI/MyTitleComp/MyTitleComp'
import Link from 'next/link';
import CompilationItem from './CompilationItem'
import { useSelector } from 'react-redux';


export default function CompilationComp({stateTypeComp = 'cont'}) {
    
    const stateComp = useSelector(state=>state[  stateTypeComp  === 'cont' ? 'Compilation Comp' : 'Compilation Comp']) 

    return (
    <section className={cl.section}>
        <div className={cl.back}>
            
        </div>
        <div className="container">
            <div className={cl.content}>

            <div className={['miniCont', cl.miniCont].join` `}>
                <MyTitleComp classTitle={cl.title} isCenter={true} additionlySvg={''}>Интересные подборки</MyTitleComp>
            </div>
            <div className={cl.listBlock}>
                <ul className={cl.list}>
                    {
                        stateComp.map((e,i)=>{
                            return (
                                <Link href={'/compilations/'+e.id}>
                                    <CompilationItem top={e.top} id={e.id} title={e.title}/>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
            </div>
        </div>
    </section>
  )
}
