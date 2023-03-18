import React, { useState } from 'react'
import cl from './MySearch.module.css'
import { useSelector } from 'react-redux'

export default function MySearch({classSearch}) {
    const [isSearch, setIsSearch] = useState('')
    const [isCategories, setIsCategories] = useState([true, false, false])
    const [searchActive, setSearchActive] = useState(false)

    const state = useSelector(state=>state['Content'])

  return (
    <div className={cl.block}>
        <div className={cl.head} onClick={e=>{!searchActive&&setSearchActive(true)}}>
            <div className={cl.searchLogo} onClick={e=>{e.stopPropagation();setSearchActive(!searchActive)}}>

            </div>
            <div className={cl.searchBlock}>
                <input type="text"  className={cl.searchInput} value={isSearch} onChange={e=>setIsSearch(e.target.value)}/>
            </div>
        </div>
        <div className={searchActive ? [cl.body, cl.activeBody].join` ` : cl.body}>
            <div className={cl.bodyCategories}>
                <div className={isCategories[0] ? [cl.categories, cl.catActive].join` ` : cl.categories} onClick={e=>setIsCategories(isCategories.map((e,i)=>i == 0 ? true : false))}>Фильмы</div>
                <div className={isCategories[1] ? [cl.categories, cl.catActive].join` ` : cl.categories} onClick={e=>setIsCategories(isCategories.map((e,i)=>i == 1 ? true : false))}>Сериалы</div>
                <div className={isCategories[2] ? [cl.categories, cl.catActive].join` ` : cl.categories} onClick={e=>setIsCategories(isCategories.map((e,i)=>i == 2 ? true : false))}>Персоны</div>
            </div>
            <div className={cl.listSearch}>
                <ul className={cl.list}>
                    {

                    }
                </ul>       
            </div>
        </div>
    </div>
  )
}
