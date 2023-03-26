import React, { useEffect, useMemo, useState } from 'react'
import cl from './SearchComp.module.css';
import {getMoviesBlankAPI} from './../../untils/API/getMoviesBlankAPI';
import MyTitleComp from '../UI/MyTitleComp/MyTitleComp'
import Link from 'next/link';


export default function SearchComp() {
  const [isPag, setIsPag] = useState(1)
  const [isLoader, setIsLoader] = useState(true)
  const [searchState, setSearchState] = useState([])
  const [isSearch,isCategories] = typeof window !== 'undefined'? window.location.href.split`?`[1].split`&`.map(e=>e.split('=').filter(el=>el!=='tt'&&el!=='tf')[0]) : [false,false]

  useEffect(()=>{
    const responce = getMoviesBlankAPI(`search?minYear=1965&maxYear=2023&minRating=0&limit=24&minVotes=5000&name=${isSearch}&type=${isCategories}&genre=&country=&sort=rating&page=${isPag}`)
    responce.then(data=>{
        console.log(data)
        setSearchState(data)
        setIsLoader(false)
    })
  },[isSearch,isCategories])
  console.log(isSearch, isCategories)

  const prevPageFunc = (e)=>{
    setIsPag(isPag!==1 ? isPag-1:1);
    window.scrollTo({top:0,behavior:'smooth'});
    setIsLoader(true) 

    const responce = getMoviesBlankAPI(`search?minYear=1965&maxYear=2023&minRating=0&limit=24&minVotes=5000&name=${isSearch}&type=${isCategories}&genre=&country=&sort=rating&page=${isPag!==1 ? isPag-1:1}`)
    responce.then(data=>{
        console.log(data)
        setSearchState(data)
        setIsLoader(false)
    })
  }
  const nextPageFunc = (e)=>{
    setIsPag(isPag+1);
    window.scrollTo({top:0,behavior:'smooth'});
    const responce = getMoviesBlankAPI(`search?minYear=1965&maxYear=2023&minRating=0&limit=24&minVotes=5000&name=${isSearch}&type=${isCategories}&genre=&country=&sort=rating&page=${isPag+1}`)
    responce.then(data=>{
        console.log(data)
        setSearchState(data)
        setIsLoader(false)
    })
  }

  return (
    <section className={cl.section}>
      <div className={isLoader ? ["loaderBLock", "loaderActive"].join` ` :"loaderBLock"}>
            <div className={"loader"}>
                <span className={"loadSvg"}>
                <svg version="1.1" id="loader-1"  x="0px" y="0px"
                    width="100px" height="100px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40" >
                    <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                    <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                        C22.32,8.481,24.301,9.057,26.013,10.047z">
                        <animateTransform attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 20 20"
                        to="360 20 20"
                        dur="0.5s"
                        repeatCount="indefinite"/>
                        </path>
                    </svg>
                </span>
            </div>
        </div>
      <div className={["miniCont", cl.miniCont].join` `}>
        <MyTitleComp classTitle={cl.title} isCenter={false} additionlySvg={''}>Результаты поиска</MyTitleComp>
        <div className={cl.blockList}>
          <ul className={cl.list}>
            {searchState.map((e,i)=>{
              return (
                <Link href={'/movies/'+e.id} key={i}>
                  <li className={cl.itemList}>
                    <img src={e.url} alt=""  className={cl.img}/>
                    <div className={cl.rightItem}>
                      <div className={cl.infoBlock}>
                        <p className={cl.enTitle}>{e.year}</p>
                        <h2 className={cl.titleFilm}>{e.name}</h2>
                        <div className={cl.textsFilm}>
                          <span className={cl.textItem}>{e.counties.join`, `}, </span>
                          <span className={cl.textItem}>{e.genres.join`, `},</span>
                        </div>
                      </div>
                      <div className={cl.ratingBlock}>
                        <span className={cl.ratingValue}>
                          {`${e.rating}`.slice(0,3)}
                        </span>
                      </div>
                    </div>
                  </li>
                </Link>
              )
            })}
          </ul>
          {
            searchState.length < 24 ? 
            ''
            :
            <div className={cl.pagination}>
            <div className={cl.pagBlock}>
                <span className={cl.prevArrow} onClick={e=>{prevPageFunc(e)}}>
                <svg width="27px" height="27px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z" /></svg>
                </span>
            </div>
            <div className={cl.pagBlock}>
                <span className={cl.nextArrow}  onClick={e=>{nextPageFunc(e)}}>
                <svg width="27px" height="27px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M338.752 104.704a64 64 0 0 0 0 90.496l316.8 316.8-316.8 316.8a64 64 0 0 0 90.496 90.496l362.048-362.048a64 64 0 0 0 0-90.496L429.248 104.704a64 64 0 0 0-90.496 0z" /></svg>

                </span>
            </div>
        </div>
          }
         
        </div>
      </div>
    </section>
  )
}
