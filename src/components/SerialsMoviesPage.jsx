import React, {useState, useEffect} from 'react'
import cl from './../styles/SerialsMoviesPage.module.css'
import MyTitleComp from './UI/MyTitleComp/MyTitleComp'
import MySelect from './UI/MySelect/MySelect';
import MyDropBlock from './UI/MyDropBlock/MyDropBlock';
import Link from 'next/link';
import MyFilterSelect from './UI/MyFilterSelect/MyFilterSelect';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterCountries } from 'redux/filterCountries-reducer';
import { setFilterGenres } from 'redux/filterGenres-reducer';
import { setFilterYears } from 'redux/filterYears-reducer';
import MyBtnFiled from './UI/MyBtnFiled/MyBtnFiled';

import { getOfficialYandexMovies } from 'src/untils/API/getOfficialYandexMovies';
import { setStateMoviePage } from 'redux/pageMovie-reducer';
import BigSwiperItem from './BigSwiperItem';


export default function SerialsMoviesPage({title='Фильмы', isSerial=false, }) {
    
    const dispatch = useDispatch()
    
    const [isLoader, setIsLoader] = useState(false)
    const [isSortSelect, setIsSortSelect] = useState(false)
    const [isDropBlock, setIsDropBlock] = useState(null)
    const  stateMovies = useSelector(state=>state['Movies Page'])
    
    console.log(stateMovies)
    
    const [isPag, setIsPag] = useState(1)
    
    useEffect(()=>{setIsLoader(true)},[])

    useEffect(()=>{

        // const officialHeroData = isSerial ? getOfficialYandexMovies(`/v1/movie?sortField=&page=${isPag}&limit=40&year=2022-2023&rating.kp=7-8&countries.name=США&type=tv-series`, setStateMoviePage, dispatch, false) :getOfficialYandexMovies(`/v1/movie?sortField=&page=${isPag}&limit=40&year=2022-2023&rating.kp=7-8&countries.name=США`, setStateMoviePage, dispatch, false);
    },[isPag])
    
    console.log(stateMovies)

    useEffect(()=>{
        isLoader&&setTimeout(()=>setIsLoader(false),1200)
    },[isLoader])
    
    const stateCountries = useSelector(state=>state['Filter Countries'])
    
    const stateGenres = useSelector(state=>state['Filter Genres'])
    
    const stateYears = useSelector(state=>state['Filter Years'])
   

    const [isSortInfo, setIsSortInfo] = useState([{id:1,text:'Рейтинг Больше',active:false},{id:2,text:'Рейтинг Меньше',active:false},{id:3,text:'Сначало Новые',active:true},{id:4,text:'Сначало Старые',active:false}])

    const SaveFilters = (e)=>{
        setIsDropBlock(false)
    }

    return (
    <div className={cl.block}>
        <div className={isLoader ? [cl.loaderBLock, cl.loaderActive].join` ` :cl.loaderBLock}>
            <div className={cl.loader}>
                <span className={cl.loadSvg}>

                </span>
            </div>
        </div>
        <div className="container">
            <MyTitleComp classTitle={cl.title} additionlySvg={cl.redordSvg}>
               {
                    title=='Фильмы' ? 
                    <>
                        <span>{title}</span> <span className={cl.slashSign}>/</span> <Link href={'/serials'} className={cl.titleLink}>Сериалы</Link>
                    </>
                     :
                     <>
                      <span>{title}</span> <span className={cl.slashSign}>/</span> <Link href={'/movies'} className={cl.titleLink}>Фильмы</Link>                      
                     </>
               }
            </MyTitleComp>
            <div className={cl.filtersCont}>
                <div className={cl.fitlersBlock}>
                    <div className={cl.filtersWrap}>
                        <div className={cl.blockSelect}>
                            <div className={[cl.headFilters].join` `} onClick={e=>setIsDropBlock(!isDropBlock)}>
                                <p className={cl.headDrop}>Фильтры <span className={cl.arrowRight}></span></p>
                            </div>
                        </div>
                    </div>
                    <div className={cl.sortWrap}>
                        <p className={cl.sortText}>Сортировка:</p>
                        <div className={cl.sortBlock}>

                        <MySelect isSelect={isSortSelect} setIsSelect={setIsSortSelect} infoSelect={isSortInfo} setInfoSelect={setIsSortInfo}/>
                        </div>
                    </div>
                </div>  
                <div className={isDropBlock ? [cl.blockDrop, cl.activeDrop].join` ` : isDropBlock===false ?  [cl.blockDrop, cl.closeDrop].join` `  : cl.blockDrop}>
                    <div className={cl.blockCont}>
                        <div className={cl.filterBlock}>
                            <MyFilterSelect infoSelect={stateCountries} setInfoSelect={setFilterCountries}/>
                        </div>
                        <div className={cl.filterBlock}>
                            <MyFilterSelect infoSelect={stateGenres} setInfoSelect={setFilterGenres} />
                        </div>
                        <div className={cl.filterBlock}>
                            <MyFilterSelect infoSelect={stateYears} setInfoSelect={setFilterYears} />
                        </div>
                        <div className={cl.filterBlock}>
                           <MyBtnFiled handleFunc={SaveFilters} classBtn={cl.btnSave}>Сохранить</MyBtnFiled>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cl.contentBlock}>
                <ul className={cl.listFilms}>
                    {stateMovies[0]!==undefined&&stateMovies.map((e,i)=>{
                        return (
                            <React.Fragment key={i}>

                               <BigSwiperItem idFilm={e.id} img={e.poster.url} descr={e.description} title={  e.names[0].name} titleEn={ e.names[1] ? e.names[1].name : ''} rating={e.rating}  year={e.year}/>
                            </React.Fragment>
                        )
                    })}
                </ul>
                <div className={cl.pagination}>
                    <div className={cl.pagBlock}>
                        <span className={cl.prevArrow} onClick={e=>{setIsPag(isPag!==1 ? isPag-1:1);window.scrollTo({top:0,behavior:'smooth'});setIsLoader(true)}}></span>
                    </div>
                    <div className={cl.pag}>
                        {/* {
                            stateMovies[0]!==undefined ?
                            isPag[1]===1?
                            stateMovies.filter((e,i)=>i<30&&(i+1===1||`${i+1}`.split``.reverse()[0]==1)).map((e,i)=><span onClick={event=>setIsPag([i,i+1])}>{1+i}</span>)
                            : (~~(stateMovies.length/10))-isPag[1]===0 ? 
                            stateMovies.reverse().filter((e,i)=>i>30&&(i+1===1||`${i+1}`.split``.reverse()[0]==1)).reverse().map((e,i)=><span onClick={event=>setIsPag([i,i+1])}>{1+i}</span>)
                            : [isPag[1]-1,isPag[1],isPag[1]+1].map(e=><span onClick={setIsPag([e-1,e])}>{e}</span>)
                            :''

                         
                        } */}
                    </div>
                    <div className={cl.pagBlock}>
                        <span className={cl.nextArrow}  onClick={e=>{setIsPag(isPag+1);window.scrollTo({top:0,behavior:'smooth'});setIsLoader(true)}}></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
