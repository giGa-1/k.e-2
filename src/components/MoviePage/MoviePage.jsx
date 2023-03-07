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

export default function MoviePage() {
    
    const dispatch = useDispatch()
    const stateFav = useSelector(state=>state['Fav State'])

    const stateFilm = useSelector(state=>state['Movie Page']).infoObj

    const tabsState = useSelector(state=>state['Tabs btns card'])

    const [stateReviews, setStateReviews] = useState([
        {userPic:'',rating:'8',dateReview:'04.03.2023', initialsUser : 'Bot1 420691337', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur  magn dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
        {userPic:'',rating:'7',dateReview:'01.03.2023', initialsUser : 'Bot2 24206914312', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
        {userPic:'',rating:'6.5',dateReview:'14.02.2023', initialsUser : 'Bot3 091283123', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit am maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
        {userPic:'',rating:'4.5',dateReview:'24.02.2023', initialsUser : 'Bot4 091283123', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit am maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
        {userPic:'',rating:'8.5',dateReview:'15.02.2023', initialsUser : 'Bot5 091283123', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit am maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
        {userPic:'',rating:'9.5',dateReview:'14.01.2023', initialsUser : 'Bot6 091283123', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit am maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
        {userPic:'',rating:'4.5',dateReview:'14.01.2023', initialsUser : 'Bot7 091283123', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit am maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
        {userPic:'',rating:'6',dateReview:'01.02.2023', initialsUser : 'Bot8 091283123', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit am maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
        {userPic:'',rating:'5',dateReview:'01.01.2023', initialsUser : 'Bot9 091283123', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit am maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
        {userPic:'',rating:'4',dateReview:'12.12.2023', initialsUser : 'Bot10 091283123', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit am maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
        {userPic:'',rating:'8.3',dateReview:'16.11.2023', initialsUser : 'Bot11 091283123', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit am maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
        {userPic:'',rating:'9.1',dateReview:'26.02.2023', initialsUser : 'Bot12 091283123', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit am maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
        {userPic:'',rating:'10',dateReview:'28.04.2023', initialsUser : 'Bot12 091283123', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit am maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
        {userPic:'',rating:'6.1',dateReview:'31.05.2023', initialsUser : 'Bot14 091283123', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit am maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
        {userPic:'',rating:'6.5',dateReview:'23.06.2023', initialsUser : 'Bot15 091283123', reviewUser : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit am maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.',},
    ])

    const [isPag, setIsPag] = useState([0,1])
    const [isLoading, setIsLoading] = useState(false)
    const [isFav, setIsFav] = useState(null)
    const [isSelect, setIsSelect] = useState(false);
    const [infoSelect, setInfoSelect] = useState([{id:1,text:'По Убыванию',active:false},{id:2,text:'По Возрастанию',active:false},{id:3,text:'Сначало Новые',active:true},{id:4,text:'Сначало Старые',active:false}])
    const [isTextareaReview, setIsTextareaReview] = useState('');
    const [isRatingReview, setIsRatingReview] = useState('7');
    const [isReviewOpen, setIsReviewOpen] = useState(false);


    const stateUser = {userName: 'Not Bot 123123'}

    useMemo(()=>{
        if(Object.values(infoSelect.filter(e=>e.active)[0]).length){
            infoSelect.filter(e=>e.active)[0].id===3 ? 
            setStateReviews(stateReviews.sort((a,b)=> +(b.dateReview.split`.`.reverse().join``)-(+(a.dateReview.split`.`.reverse().join``)) ))
            : infoSelect.filter(e=>e.active)[0].id===4 ? setStateReviews(stateReviews.sort((a,b)=> +(a.dateReview.split`.`.reverse().join``)-(+(b.dateReview.split`.`.reverse().join``)) ))
            : infoSelect.filter(e=>e.active)[0].id===2 ? setStateReviews(stateReviews.sort((a,b)=> +(a.rating)-(+(b.rating)) ))
            : infoSelect.filter(e=>e.active)[0].id===1 ? setStateReviews(stateReviews.sort((a,b)=>+(b.rating)-(+(a.rating)) )) : ''       
        }
    },[infoSelect,stateReviews ])


    useMemo(()=>{
        Object.values(stateFilm).length&&setIsLoading(true)
    },[stateFilm])

    
    useEffect(()=>{
        const officialHeroData = getOfficialYandexMovies('/v1/movie/'+`${window.location.href}?`.split`/`[`${window.location.href}`.split`/`.length-1], setInfoMoviePage, dispatch, true);
    },[])

 
    console.log(stateFilm)

    const sendReviewToState = (e)=>{
        setStateReviews([...stateReviews, {id:stateReviews.length+1,rating:isRatingReview,dateReview:dayjs().format('DD.MM.YYYY'),initialsUser:stateUser.userName,reviewUser:isTextareaReview}])
    }

    useEffect(()=>{
        isFav?dispatch(setFavNewItems(stateFilm)):isFav===false?dispatch(deleteFavItems(stateFilm.id)):''
    },[isFav])


  return (
 
    <>
    <section className={cl.section}>
        <div className="container">
            <div className={cl.content}>
            <div className={cl.leftBlock}>
                     <div className={cl.imgBlock}>
                         <img src={isLoading&&stateFilm.poster.url}  className={cl.imgPoster}/>
                     </div>
                     <div className={cl.videoBlock}>
                         <p className={cl.trailerText}>Трейлер к фильму:</p>
                         <>
                             <ReactPlayer url={isLoading&&stateFilm.videos.trailers[0].url} style={{maxWidth: '350px', width:'100%', maxHeight: '220px', border: ' 1px solid #333', boxShadow: ' rgba(100, 100, 111, 0.15) 0px 7px 29px 0px', borderRadius: '15px', overflow: 'hidden'}}>
                             </ReactPlayer>
                         </>
                       
                     </div>
                 </div>
                <div className={cl.rightBlock}>
                    <div className={cl.tabsHead}>
                        <div className={cl.tabsHeadTitle}>
                            <div className={cl.tabsTextBlock}>
                                <p className={cl.nameEnFilm}>{isLoading&&stateFilm.names[1].name}</p>
                                <h1 className={cl.nameFilm}>
                                    {isLoading&&stateFilm.names[0].name}
                                </h1>
                                <p className={cl.descrFilm}>
                                    {isLoading&&stateFilm.description}
                                </p>
                            </div>
                            <div className={cl.favBlock} onClick={e=>{setIsFav(!isFav)}}>
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
                                        <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>{isLoading&&stateFilm.seasonsInfo.length!==0 ? 'Сезоны' :  'Время'}</span>
                                            <span className={cl.valueRow}>{isLoading&&stateFilm.seasonsInfo.length!==0 ? `${stateFilm.seasonsInfo.length} сезона, ${~~(stateFilm.seasonsInfo.reduce((ac,e)=>+(e.episodesCount)+ac,0)/stateFilm.seasonsInfo.length)} серий (сред. значение)`  :  `${stateFilm.movieLength} мин - ${~~(stateFilm.movieLength/60)} ч. ${stateFilm.movieLength-(~~(stateFilm.movieLength/60)*60)} мин.`}</span>
                                       </div>
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Год</span>
                                            <span className={cl.valueRow}>{isLoading&&stateFilm.year}</span>
                                       </div>
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Жанр</span>
                                            <span className={cl.valueRow}>{isLoading&&stateFilm.genres.map(e=>e.name).join`, `}</span>
                                       </div>
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Страна</span>
                                            <span className={cl.valueRow}>{isLoading&&stateFilm.countries.map(e=>e.name).join`, `}</span>
                                       </div>
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Сборы</span>
                                            <span className={cl.valueRow}>
                                                
                                                  {isLoading&&`${stateFilm.fees.world.currency}${(stateFilm.fees.world.value+'').split``.reverse().filter((e,i)=>i>5).reverse().join``} млн`}
                                                
                                            </span>
                                       </div>
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Бюджет</span>
                                            <span className={cl.valueRow}>{isLoading&&`${stateFilm.budget.currency}${(stateFilm.budget.value+'').split``.reverse().filter((e,i)=>i>5).reverse().join``} млн`}</span>
                                       </div>
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Возраст</span>
                                            <span className={cl.valueRow}>{isLoading&&stateFilm.ageRating}+</span>
                                       </div>
                                      
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Режиссер</span>
                                            <span className={cl.valueRow}>Стивен Кинг</span>
                                       </div>
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Продюсер</span>
                                            <span className={cl.valueRow}>Стивен Кинг</span>
                                       </div>
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Композитор</span>
                                            <span className={cl.valueRow}>Стивен Кинг</span>
                                       </div>
                                       <div className={cl.aboutRow}>
                                            <span className={cl.titleRow}>Художник</span>
                                            <span className={cl.valueRow}>Стивен Кинг</span>
                                       </div>

                                    </div>
                                </div>
                            : tabsState.filter(e=>e.cardId=='reviews')[0].active ? 
                                <div className={cl.tabsAbout}>
                                    <div className={cl.filtersBlock}>
                                        <div className={cl.sendReview} onClick={e=>setIsReviewOpen(!isReviewOpen)}>
                                            Оставить отзыв...
                                        </div>
                                        <div className={cl.selectBlock}>
                                            <MySelect setIsSelect={setIsSelect} isSelect={isSelect} infoSelect={infoSelect} setInfoSelect={setInfoSelect}/>
                                        </div>
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
                                                    <p className={cl.ratingText}>- {isRatingReview}</p>
                                                </div>
                                            </div>
                                       </div>
                                    </div>
                                    <div className={cl.listBlock}>
                                        <ul className={cl.list}>
                                            {stateReviews.slice(isPag[0],+(`${isPag[1]}0`)).map((e,i)=>
                                                <MoviePageReviews userPic={e.userPic} rating={e.rating} dateReview={e.dateReview} initialsUser={e.initialsUser} reviewUser={e.reviewUser}  key={i} />
                                            )}
                                        </ul>
                                        <div className={cl.pagiantion}>
                                            <span className={cl.prevArrow}></span>
                                            <span className={cl.pagNumbers}>
                                                {
                                                    isPag[1]===1?
                                                    stateReviews.filter((e,i)=>i<30&&(i+1===1||`${i+1}`.split``.reverse()[0]==1)).map((e,i)=><span onClick={event=>setIsPag([i,i+1])}>{1+i}</span>)
                                                    : (~~(stateReviews.length/10))-isPag[1]===0 ? 
                                                    stateReviews.reverse().filter((e,i)=>i>30&&(i+1===1||`${i+1}`.split``.reverse()[0]==1)).reverse().map((e,i)=><span onClick={event=>setIsPag([i,i+1])}>{1+i}</span>)
                                                    : [isPag[1]-1,isPag[1],isPag[1]+1].map(e=><span onClick={setIsPag([e-1,e])}>{e}</span>)
                                                   
                                                }
                                            </span>
                                            <span className={cl.nextArrow}></span>
                                        </div>
                                    </div>
                                </div>
                            :
                            tabsState.filter(e=>e.cardId=='actors')[0].active ? 
                                <div className={cl.tabsAbout}>
                                    <ul className={cl.listActors}>
                                        {isLoading&&stateFilm.persons.filter((e,i)=>i<26).map((e,i)=>
                                            <Link href={'/actors/'+e.id}>
                                                <MoviewPageActors key={e.id} imgSrc={e.photo} title={e.name}/>
                                            </Link>
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
                                            {[1,1,1,1,1].map(e=>
                                                <li className={cl.itemFax}>
                                                    <span className={cl.point}></span>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa perferendis doloribus error corrupti quia aut numquam repellat possimus similique officia, odio amet molestias ad molestiae quis eum nam. Doloribus, quaerat?
                                                </li>    
                                            )}
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
                <BigSwiperList  stateSwiper={isLoading&&stateFilm.similarMovies} similar={true} title={'Вам также могут понравиться'}/>
            </div>
    </section>

  
    </>
    
  )
}
