import React from 'react'
import cl from './CompilationComp.module.css';
import { useSelector } from 'react-redux';

export default function CompilationComp() {

    const stateCompilation = useSelector((state)=>state['Compilation List Page'])

  return (
    <section className={cl.section}>
        <div className="container">
            <MyTitleComp classTitle={cl.title} isCenter={false} additionlySvg={''}>{stateCompilation.nameCompilation}</MyTitleComp>
            <div className={cl.listBlock}>
                <ul className={cl.list}>
                    {
                        stateCompilation.map((e,i)=>{
                            <React.Fragment key={i}>
                                
                            </React.Fragment>
                        })
                    }
                </ul>
            </div>
        </div>
    </section>
  )
}
