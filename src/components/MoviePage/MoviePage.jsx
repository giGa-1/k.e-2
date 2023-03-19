import React, {useEffect, useState, useMemo} from 'react'
import cl from './MoviePage.module.css'
import {useSelector, useDispatch} from 'react-redux'
import {setInfoMoviePage} from './../../../redux/moviePage-reducer';
import { getOfficialYandexMovies } from 'src/untils/API/getOfficialYandexMovies';
import {setActiveBtnsTabs} from '../../../redux/btnsCard-reducer';
import ReactPlayer from 'react-player/lazy'
import MySelect from '../UI/MySelect/MySelect';
import MoviePageReviews from './MoviePageReviews';
import MoviewPageActors from './MoviewPageActors';
import Swiper, {SwiperSlide} from 'swiper';
import MovieVideos from './MovieVideos'
import MovieFrames from './MovieFrames';
import MyModal from '../UI/MyModal/MyModal';
import MyBtnFiled from './../UI/MyBtnFiled/MyBtnFiled'
import dayjs from 'dayjs';
import MyTextarea from '../UI/MyTextarea/MyTextarea';
import BigSwiperList from '../BigSwiperList';
import {setFavNewItems, deleteFavItems} from './../../../redux/favState-reducer';
import Link from 'next/link';
import {getMoviesBlankAPI} from './../../untils/API/getMoviesBlankAPI';
import { getColorRating } from '../../untils/getColorRating';
import { getReviewsMovie } from '../../untils/API/getReviewsMovie';
import { deleteFavAPI } from '../../untils/API/deleteFavAPI';
import { addFavAPI, getFavAPI } from '../../untils/API/getFavAPI';
import { addReviewsMovie } from '../../untils/API/addReviewsMovie';

export default function MoviePage() {
    
    const dispatch = useDispatch()
    const stateFav = useSelector(state=>state['Fav State'])
    const stateMovieAll = useSelector(state=>state['Movie Page']).infoObj
    const stateFilm = stateMovieAll.json
    const [reviewsState, setReviewsState] = useState([]);
    const tabsState = useSelector(state=>state['Tabs btns card'])

    const [stateReviews, setStateReviews] = useState()
    const [commentsState,setCommentsState] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isFav, setIsFav] = useState(null)
    const [isSelect, setIsSelect] = useState(false);
    const [infoSelect, setInfoSelect] = useState([{id:1,text:'По Убыванию',active:false},{id:2,text:'По Возрастанию',active:false},{id:3,text:'Сначало Новые',active:true},{id:4,text:'Сначало Старые',active:false}])
    const [isTextareaReview, setIsTextareaReview] = useState('');
    const [isRatingReview, setIsRatingReview] = useState('7');
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [change, setChange] = useState(null)

    

    // const stateUser = localStorage.getItem('authInfo').initials

    useMemo(()=>{
        
    },[infoSelect,stateReviews ])


    
    
    useEffect(()=>{
        const reviewsData = getReviewsMovie(`${window.location.href}?`.split`/`[`${window.location.href}`.split`/`.length-1].match(/\d/g).join``);
            reviewsData.then((data)=>{
                setCommentsState(data)
                console.log(data)
            })
        const officialHeroData = getMoviesBlankAPI('movie/'+`${window.location.href}?`.split`/`[`${window.location.href}`.split`/`.length-1]);
        officialHeroData.then((data)=>{
            dispatch(setInfoMoviePage(data))
            setIsLoading(true)
        })
    },[])

    useMemo(()=>{
        if (typeof window !== 'undefined') {
            const reviewsData = getReviewsMovie(`${window.location.href}?`.split`/`[`${window.location.href}`.split`/`.length-1].match(/\d/g).join``);
            reviewsData.then((data)=>{
                setCommentsState(data)
                console.log(data)
            })
        }
       
    },[change])
 
    console.log(stateMovieAll)

   
    const sendReviewToState = (e)=>{
        const response = addReviewsMovie(`${window.location.href}?`.split`/`[`${window.location.href}`.split`/`.length-1].match(/\d/g).join``, {rating: '0', text: isTextareaReview})
        response.then(data=>{
            console.log(data)
            setChange(Math.random())

        })
    }

    useEffect(()=>{
        const deleteFav = getFavAPI("?id="+window.location.href.split`/`[window.location.href.split`/`.length-1])
        deleteFav.then(data=>{
            setCommentsState(data)
        })
    },[isFav])

    const setFavFilm = (e)=>{   
        if(isFav) {
            const deleteFav = deleteFavAPI(window.location.href.split`/`[window.location.href.split`/`.length-1])
            deleteFav.then(data=>{
                console.log(data)
                setIsFav(!isFav)
            })
        } else {
            const deleteFav = addFavAPI(window.location.href.split`/`[window.location.href.split`/`.length-1])
            deleteFav.then(data=>{
                console.log(data)
                setIsFav(!isFav)
            })
        }
      
    }

  return (
 
    <>
    <section className={cl.section}>
        <div className="container">
            <div className={cl.content}>
                <div className={cl.leftBlock}>
                     <div className={cl.imgBlock}>
                         <img src={isLoading&&stateFilm.posterUrl}  className={cl.imgPoster}/>
                         <span className={[cl.rating, ].join` `}>
                            {isLoading&&stateFilm.ratingKinopoisk}
                         </span>
                     </div>
                     {/* <div className={cl.videoBlock}>
                         <p className={cl.trailerText}>Трейлер к фильму:</p>
                         <>
                             <ReactPlayer url={isLoading&&stateFilm.videos.trailers[0].url} style={{maxWidth: '350px', width:'100%', maxHeight: '220px', border: ' 1px solid #333', boxShadow: ' rgba(100, 100, 111, 0.15) 0px 7px 29px 0px', borderRadius: '15px', overflow: 'hidden'}}></ReactPlayer>
                         </>
                       
                     </div> */}
                 </div>
                 <div className={cl.rightBlock}>
                    <div className={cl.tabsHead}>
                        <div className={cl.tabsHeadTitle}>
                            <div className={cl.tabsTextBlock}>
                                <p className={cl.nameEnFilm}>{isLoading&&stateFilm.nameOriginal}</p>
                                <h1 className={cl.nameFilm}>
                                    {isLoading&&stateFilm.nameRu}
                                </h1>
                                <p className={cl.descrFilm}>
                                    {isLoading&&stateFilm.description}
                                </p>
                            </div>
                            <div className={cl.favBlock} onClick={e=>{setFavFilm(e)}}>
                                <span className={cl.favText}>В Избранное</span>
                                <span className={isFav  ? [cl.favIcon, cl.activeFav].join` `  : cl.favIcon}>

                                </span>
                            </div>
                        </div>
                        <div className={cl.tabsBtns}>
                        {tabsState.map(e=>{
                            return (
                               
                                    <button key={e.id} onClick={event=>{dispatch(setActiveBtnsTabs({id:e.id}))}} className={e.active ? [cl.btnTabs, cl.activeBtnTabs].join` ` : cl.btnTabs}>
                                        {e.title}
                                    </button>
                              
                            )
                        })}
                    </div>
                    </div>
                    <div className={cl.tabsBody}>
                        {
                            tabsState.filter(e=>e.cardId=='about')[0].active ?
                                <div className={cl.tabsAbout}>
                                  

                                    
                                    <div className={cl.infoAbout}>
                                        {
                                            isLoading? 
                                                <div className={cl.aboutRow}>
                                                <span className={cl.titleRow}>{'Сред. Время'}</span>
                                                <span className={cl.valueRow}>{  `${stateFilm.filmLength} мин - ${~~(stateFilm.filmLength/60)} ч. ${stateFilm.filmLength-(~~(stateFilm.filmLength/60)*60)} мин.`}</span>
                                        </div>
                                            :''
                                        }
                                               
                                            
                                       
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Год</span>
                                            <span className={cl.valueRow}>
                                            {isLoading&&stateFilm.type != 'TV_SERIES' ? 
                                             isLoading&&stateFilm.year
                                            :
                                                `${isLoading&&stateFilm.year} - ${ isLoading&&stateFilm.endYear}`
                                            }
                                               
                                            
                                            </span>
                                       </div>
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Жанр</span>
                                            <span className={cl.valueRow}>{isLoading&&stateFilm.genres.map(e=>e.genre).join`, `}</span>
                                       </div>
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Страна</span>
                                            <span className={cl.valueRow}>{isLoading&&stateFilm.countries.map(e=>e.country).join`, `}</span>
                                       </div>
                                      
                                       {isLoading&&stateFilm.type != 'TV_SERIES'&&!Object.values(stateMovieAll.boxJson).length ? 
                                       <>
                                            <div className={cl.aboutRow}>
                                                <span className={cl.titleRow}>Сборы</span>
                                                <span className={cl.valueRow}>
                                                    
                                                    {isLoading&&`${stateMovieAll.boxJson.items[3].symbol}${(stateMovieAll.boxJson.items[3].amount+'').split``.reverse().filter((e,i)=>i>5).reverse().join``} млн`}
                                                    
                                                </span>
                                            </div>
                                            <div className={cl.aboutRow}>
                                                        <span className={cl.titleRow}>Бюджет</span>
                                                        <span className={cl.valueRow}>{isLoading&&`${stateMovieAll.boxJson.items[0].symbol}${(stateMovieAll.boxJson.items[0].amount+'').split``.reverse().filter((e,i)=>i>5).reverse().join``} млн`}</span>
                                            </div>
                                        </>
                                       
                                            :
                                       ''}
                                      
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Возраст</span>
                                            <span className={cl.valueRow}>{isLoading&&stateFilm.ratingAgeLimits.match(/\d/g)}+</span>
                                       </div>
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Оценки</span>
                                            <span className={cl.valueRow}>{isLoading&&stateFilm.ratingKinopoiskVoteCount}</span>
                                       </div>
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Окенка критиков</span>
                                            <span className={cl.valueRow}>
                                          
                                                {isLoading&&stateFilm.ratingImdb}
                                         
                                             
                                            
                                            </span>
                                       </div>
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Отзывов</span>
                                            <span className={cl.valueRow}>{isLoading&&stateFilm.reviewsCount}</span>
                                       </div>

                                    </div>
                                </div>
                            : tabsState.filter(e=>e.cardId=='reviews')[0].active ? 
                                <div className={cl.tabsAbout}>
                                    <div className={cl.filtersBlock}>
                                        <div className={cl.sendReview} onClick={e=>setIsReviewOpen(!isReviewOpen)}>
                                            Оставить отзыв...
                                        </div>
                                        {/* <div className={cl.selectBlock}>
                                            <MySelect setIsSelect={setIsSelect} isSelect={isSelect} infoSelect={infoSelect} setInfoSelect={setInfoSelect}/>
                                        </div> */}
                                    </div>
                                    <div className={isReviewOpen ? [cl.reviewBlock, cl.activeReviewBlock].join` ` : cl.reviewBlock}>
                                       <div className={cl.reviewWrapp}>
                                            <div className={cl.reviewHeadSend}>

                                            </div>
                                            <div className={cl.reviewBodySend}>
                                                <MyTextarea textareaValue={isTextareaReview} setTextarea={setIsTextareaReview} place={'Напишите отзыв'} classesPlace={cl.placeTextarea} classesTextarea={cl.textarea} />
                                            </div>
                                            <div className={cl.reviewSendFooter}>
                                                <div className={cl.btnBlock}>
                                                    <MyBtnFiled classBtn={cl.btnSendReview} handleFunc={sendReviewToState}>Опубликовать</MyBtnFiled>
                                                </div>
                                                <div className={cl.ratingWrap}>
                                                    {/* <p className={cl.ratingText}>- {isRatingReview}</p> */}
                                                </div>
                                            </div>
                                       </div>
                                    </div>
                                    <div className={cl.listBlock}>
                                        <ul className={cl.list}>
                                            {commentsState.length?commentsState.map((e,i)=>
                                                <MoviePageReviews   initialsUser={e.userName}  reviewUser={e.text}  key={i} />
                                            )
                                        :''}
                                        </ul>
                                     
                                    </div>
                                </div>
                            :
                            tabsState.filter(e=>e.cardId=='actors')[0].active ? 
                                <div className={cl.tabsAbout}>
                                    <ul className={cl.listActors}>
                                        {isLoading&&stateMovieAll.staffJson.filter((e,i)=>i<26).map((e,i)=>
                                            // <Link href={'/actors/'+e.staffId}>
                                                <MoviewPageActors key={e.staffId} imgSrc={e.posterUrl} descr={e.description} titleEn={e.nameEn} title={e.nameRu}/>
                                            // </Link>
                                        )}
                                    </ul>
                                </div>
                            :
                            tabsState.filter(e=>e.cardId=='media')[0].active ? 
                                <div className={cl.tabsAbout}>
                                    <div className={cl.videosBLock}>
                                        <MovieVideos />
                                    </div>
                                    <div className={cl.faxBlock}>
                                        <h3 className={cl.titleTabs}>
                                            Интереcные факты
                                        </h3>
                                        <ol className={cl.faxList}>
                                           
                                        </ol>
                                    </div>
                                    <div className={cl.framesBlock}>
                                        <MovieFrames />
                                    </div>     
                                </div>
                            : ''

                        }
                    </div>
                </div>
            </div>
        </div>
        <div className={cl.likeMovies}>
                {/* <BigSwiperList  stateSwiper={isLoading&&stateFilm.similarMovies} similar={true} title={'Вам также могут понравиться'}/>  */}
            </div>
 </section>

  
    </>
    
  )
}



