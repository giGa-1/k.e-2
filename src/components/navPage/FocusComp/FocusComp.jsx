import React, { useState, useEffect } from 'react'
import cl from  './FocusComp.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import FocusCompItem from './FocusCompItem';
import MyTitleComp from './../../UI/MyTitleComp/MyTitleComp'
import { getNewsAPIjs } from 'src/untils/API/getNewsAPI';

import { useInView } from 'react-intersection-observer';
import { Navigation } from 'swiper';
import Link from 'next/link';

export default function FocusComp() {

    const [stateNews, setStateNews] = useState([])
    const [stateNewsN, setStateNewsN] = useState([])
    const [isLoader, setIsLoader] = useState(false)

    useEffect(()=>{
        const response = getNewsAPIjs('page=1');
        response.then((data)=>{
            setStateNews(data.filter(e=>Object.keys(e).length !== 0).filter(e=>e.coverUrl))
        })
        const response2 = getNewsAPIjs('page=2');
        response2.then((data)=>{
            setStateNewsN(data)
            setIsLoader(true)
        })
    },[])

    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: .2,
      });

      const [ refSwiper, inViewSwiper] = useInView({
        /* Optional options */
        threshold: 0,
      });
    
    const state = useSelector(state=>state['Focus Comp'])
    return (
    <div ref={ref} className={inView ? [cl.section, cl.activeSection].join` ` : cl.section}>
          <div className={!isLoader ? ["loaderBLock", "loaderActive"].join` ` :"loaderBLock"}>
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
        {
            stateNews[0]!==undefined ?
            <div className="container">
            <div className={[cl.content, 'miniCont'].join` `}>
                <MyTitleComp classTitle={cl.title}>Будьте в курсе всех событий!</MyTitleComp>
                <div className={cl.newsBlock}>
                    <div className={cl.newsLeftBlock}>
                        <Link href={'/news/'+[...stateNews, ...stateNewsN][0].date} className={cl.link}>
                            <div className={[cl.newsTopBlock, cl.newsItem].join` `}>
                                <img src={[...stateNews, ...stateNewsN][0].coverUrl} className={cl.imgItem}/>
                                <div className={cl.itemContent}>
                                    <p className={cl.itemDescr}>{[...stateNews, ...stateNewsN][0].title.slice(0, 95)}...</p>
                                </div>
                            </div>
                        </Link>
                        <div className={[cl.newsBottomBlock, cl.newsBottomLeft].join` `}>
                            <Link href={'/news/'+[...stateNews, ...stateNewsN][1].date} className={cl.link}>
                                <div className={cl.newsItem}>
                                    <img src={[...stateNews, ...stateNewsN][1].coverUrl} className={cl.imgItem}/>
                                    <div className={cl.itemContent}>
                                        <p className={cl.itemDescr}>{[...stateNews, ...stateNewsN][1].title.slice(0, 45)}...</p>
                                    </div>
                                </div>
                            </Link>
                            <Link href={'/news/'+[...stateNews, ...stateNewsN][2].date} className={cl.link}>
                                <div className={cl.newsItem}>
                                    <img src={[...stateNews, ...stateNewsN][2].coverUrl} className={cl.imgItem}/>
                                    <div className={cl.itemContent}>
                                        <p className={cl.itemDescr}>{[...stateNews, ...stateNewsN][2].title.slice(0, 45)}...</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={cl.newsRightBlock}>
                        <div className={[cl.newsTopBlock, cl.newsTopRight].join` `}>
                            <div className={cl.newsTopRightContent}>
                                <Link href={'/news/'+[...stateNews, ...stateNewsN][3].date} className={cl.link}>
                                    <div className={cl.newsItem}>
                                        <img src={[...stateNews, ...stateNewsN][3].coverUrl} className={cl.imgItem}/>
                                        <div className={cl.itemContent}>
                                            <p className={cl.itemDescr}>{[...stateNews, ...stateNewsN][3].title.slice(0, 45)}...</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link href={'/news/'+[...stateNews, ...stateNewsN][4].date} className={cl.link}>
                                    <div className={cl.newsItem}>
                                        <img src={[...stateNews, ...stateNewsN][4].coverUrl} className={cl.imgItem}/>
                                        <div className={cl.itemContent}>
                                            <p className={cl.itemDescr}>{[...stateNews, ...stateNewsN][4].title.slice(0, 45)}...</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <Link href={'/news/'+[...stateNews, ...stateNewsN][6].date} className={cl.link}>
                                    <div className={[cl.newsItem, cl.newsText].join` `}>
                                        <p className={cl.textItem}>
                                            {[...stateNews, ...stateNewsN][6].text.slice(0, 350)}...
                                        </p>
                                        <div className={cl.textItemBottom}>
                                            <p className={cl.readMoreItem}>Читать далее...</p>
                                            <div className={cl.newsDotted}>
                                                <span></span>
                                                <span></span>
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                            </Link>
                        </div>
                        <Link href={'/news/'+[...stateNews, ...stateNewsN][5].date} className={cl.link}>
                            <div className={[cl.newsBottomBlock, cl.newsItem].join` `}>
                            <img src={[...stateNews, ...stateNewsN][5].coverUrl} className={cl.imgItem}/>
                                <div className={cl.itemContent}>
                                    <p className={cl.itemDescr}>{[...stateNews, ...stateNewsN][5].title.slice(0, 95)}...</p>
                                </div>
                            </div>
                        </Link>
                      
                    </div>
                </div>
                <div ref={refSwiper} className={inViewSwiper ? [cl.swiperBlock, cl.swiperActive].join` ` :cl.swiperBlock}>
                    <Swiper
                        modules={[Navigation]}
                       spaceBetween={30}
                       slidesPerView={5}
                       navigation={true}
                       onSlideChange={() => console.log('slide change')}
                       onSwiper={(swiper) => console.log(swiper)}
                       className={cl.swiper}
                    >
                        
                        {stateNewsN[0]&&stateNewsN.filter(e=>e.coverUrl!==''&&e.coverUrl !== undefined&&e.title!==undefined&&e.title!='').map(e=>{
                            return (
                                <SwiperSlide key={e.id} className={cl.swiperSlide}>
                                    <Link href={'/news/'+e.date} className={cl.link}>
                                    <FocusCompItem  title={e.title} img={e.coverUrl}/>
                                    </Link>
                                   
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
            :
''
        }
    </div>
  )
}
