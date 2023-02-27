import React from 'react';
import cl from './Compilation.module.css';
import MyTitleComp from './../../UI/MyTitleComp/MyTitleComp'
import Link from 'next/link';
import CompilationItem from './CompilationItem'
import { useSelector } from 'react-redux';

export default function CompilationComp() {

    const stateComp = useSelector(state=>state['Compilation Comp']);
    
  return (
    <section className={cl.section}>
        <div className="container">
            <div className={cl.content}>
            <MyTitleComp classTitle={cl.title} additionlySvg={''}>Интересные подборки</MyTitleComp>
            <div className={cl.listBlock}>
                <ul className={cl.list}>
                    {
                        stateComp.map((e,i)=>{
                            return (
                                <Link href={'/compilations/'+e.id}>
                                    <CompilationItem top={e.compilation} id={e.id} title={e.title}/>
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
