import React from 'react'
import cl from './FocusPage.module.css'
import { replacerComments } from '../../untils/Replacer'

export default function FocusPage({state}) {
    
    return (
    <section className={cl.section}>
        <div className="container">
            <h1 className={cl.title}>{state.title}</h1>
            <p className={cl.descr}>{replacerComments(state.descr, '__', <br/>)}</p>
        </div>
    </section>
  )
}
