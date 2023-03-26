import React, { useMemo, useState } from 'react'
import cl from './MySearch.module.css'
import { useSelector } from 'react-redux'
import {getMoviesBlankAPI} from './../../../untils/API/getMoviesBlankAPI';
import { getColorRating } from '@/untils/getColorRating';
import Link from 'next/link';
export default function MySearch({classSearch}) {
    const [isSearch, setIsSearch] = useState('')

  
    const [isCategories, setIsCategories] = useState([true, false])
    const [searchActive, setSearchActive] = useState(false)
    const [searchState, setSearchState] = useState([]);
    const state = useSelector(state=>state['Content'])

    const searchItems = ()=>{
        const responce = getMoviesBlankAPI(`search?minYear=1965&maxYear=2023&minRating=0&limit=11&minVotes=5000&name=${isSearch}&type=${isCategories[0] ? 'movie' : 'tv-series'}&genre=&country=&sort=rating&page=1`)
        responce.then(data=>{
            console.log(data)
            setSearchState(data)
        })
    }

  return (
    <div className={cl.block}>
        <div className={searchActive ? [cl.head, cl.activeHead].join` ` : cl.head} onClick={e=>{setSearchActive(true)}}>
            <div className={cl.searchLogo}  onClick={e=>{e.stopPropagation();searchItems()}}>

            </div>
            <form className={cl.searchBlock} onSubmit={e=>{e.preventDefault();searchItems()}}>
                <input type="text"  className={cl.searchInput} value={isSearch} onChange={e=>{setIsSearch(e.target.value)}} onClick={e=>e.stopPropagation()}  />
            </form>
        </div>
        <div className={searchActive ? [cl.body, cl.activeBody].join` ` : cl.body}>
            <div className={cl.headBody}>
                
                <div className={cl.bodyCategories}>
                    <div className={isCategories[0] ? [cl.categories, cl.catActive].join` ` : cl.categories} onClick={e=>{setIsCategories(isCategories.map((e,i)=>i == 0 ? true : false))}}>Фильмы</div>
                    <div className={isCategories[1] ? [cl.categories, cl.catActive].join` ` : cl.categories} onClick={e=>{setIsCategories(isCategories.map((e,i)=>i == 1 ? true : false))}}>Сериалы</div>
                </div>
                <div className={cl.closeBtn} onClick={e=>setSearchActive(false)}>
                    <div className={cl.closeBlock}>
                        <span className={cl.closeVer}></span>
                        <span className={cl.closeHor}></span>
                    </div>
                
                </div>
            </div>
          
            <div className={cl.listSearch}>
                <ul className={cl.list}>
                    { searchState.length?searchState.map((e,i,arr)=>{
                        return (
                            i==arr.length-1 ? 
                            <Link key={i} href={`/search?tt=${isSearch}&tf=${isCategories[0] ? 'movie' : 'tv-series'}`} className={cl.link}>
                                <li className={cl.itemMore}>
                                    <p className={cl.moreText}>Показать больше...</p>
                                </li>
                            </Link>
                            :
                            <Link key={i} href={'/movies/'+e.id} className={cl.link}>
                                <li className={cl.itemBody}>
                                    <img src={e.previewUrl} alt="" className={cl.imgSearch}/>
                                    <p className={cl.textItem}>{e.name}</p>
                                    
                                    <span className={[cl.rating, getColorRating(e.rating)].join` `}>
                                        {(e.rating+'').slice(0,3)}
                                    </span>
                                </li>
                            </Link>
                        )
                    })
                        : ''
                    }
                </ul>       
            </div>
        </div>
    </div>
  )
}
