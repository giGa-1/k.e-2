import React from 'react'
import cl from './NewComp.module.css'
import { useSelector } from 'react-redux'
import NewCompItem from './NewCompItem'
import MyTitleComp from './../../UI/MyTitleComp/MyTitleComp'
import Link from 'next/link'

export default function NewsComp() {

    const stateNews = useSelector((state)=>state['News Comp'])
  return (
    <section className={cl.section}>
        <div className={cl.back}>

        </div>
        <div className="container">
            <MyTitleComp classTitle={cl.title} additionlySvg={cl.news}>Свежие новости кино</MyTitleComp>
            {/* <div className={cl.acc}>
                <div className={cl.listAcc}>
                    {stateNews.map((e,i)=> <NewCompItem title={e.title} active={e.active} descr={e.descr} id={e.id} /> )}
                </div>
            </div> */}
            <div className={cl.blockNews}>
                <ul className={cl.listNews}>
                    {
                        stateNews.map((e,i)=>{
                            return (
                                <Link href={'/news/'+e.id} key={e.id}>
                                    <NewCompItem title={e.title} active={e.active} descr={e.descr} id={e.id}/>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
            <div className={cl.bottom}>
                <Link href='/news'>...</Link>
            </div>
        </div>
    </section>
  )
}
