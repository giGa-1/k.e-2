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
            setStateNews(data)
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
        {
            stateNews[0] ?
            <div className="container">
            <div className={[cl.content, 'miniCont'].join` `}>
                <MyTitleComp classTitle={cl.title}>Будьте в курсе всех событий!</MyTitleComp>
                <div className={cl.newsBlock}>
                    <div className={cl.newsLeftBlock}>
                        <Link href={'/news/'+stateNews[11].date} className={cl.link}>
                            <div className={[cl.newsTopBlock, cl.newsItem].join` `}>
                                <img src={stateNews[11].coverUrl} className={cl.imgItem}/>
                                <div className={cl.itemContent}>
                                    <p className={cl.itemDescr}>{stateNews[11].title.slice(0, 95)}...</p>
                                </div>
                            </div>
                        </Link>
                        <div className={[cl.newsBottomBlock, cl.newsBottomLeft].join` `}>
                            <Link href={'/news/'+stateNews[1].date} className={cl.link}>
                                <div className={cl.newsItem}>
                                    <img src={stateNews[1].coverUrl} className={cl.imgItem}/>
                                    <div className={cl.itemContent}>
                                        <p className={cl.itemDescr}>{stateNews[1].title.slice(0, 45)}...</p>
                                    </div>
                                </div>
                            </Link>
                            <Link href={'/news/'+stateNews[2].date} className={cl.link}>
                                <div className={cl.newsItem}>
                                    <img src={stateNews[2].coverUrl} className={cl.imgItem}/>
                                    <div className={cl.itemContent}>
                                        <p className={cl.itemDescr}>{stateNews[2].title.slice(0, 45)}...</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={cl.newsRightBlock}>
                        <div className={[cl.newsTopBlock, cl.newsTopRight].join` `}>
                            <div className={cl.newsTopRightContent}>
                                <Link href={'/news/'+stateNews[3].date} className={cl.link}>
                                    <div className={cl.newsItem}>
                                        <img src={stateNews[3].coverUrl} className={cl.imgItem}/>
                                        <div className={cl.itemContent}>
                                            <p className={cl.itemDescr}>{stateNews[3].title.slice(0, 45)}...</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link href={'/news/'+stateNews[4].date} className={cl.link}>
                                    <div className={cl.newsItem}>
                                        <img src={stateNews[4].coverUrl} className={cl.imgItem}/>
                                        <div className={cl.itemContent}>
                                            <p className={cl.itemDescr}>{stateNews[4].title.slice(0, 45)}...</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <Link href={'/news/'+stateNews[6].date} className={cl.link}>
                                    <div className={[cl.newsItem, cl.newsText].join` `}>
                                        <p className={cl.textItem}>
                                            {stateNews[6].text.slice(0, 350)}...
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
                        <Link href={'/news/'+stateNews[5].date} className={cl.link}>
                            <div className={[cl.newsBottomBlock, cl.newsItem].join` `}>
                            <img src={stateNews[5].coverUrl} className={cl.imgItem}/>
                                <div className={cl.itemContent}>
                                    <p className={cl.itemDescr}>{stateNews[7].title.slice(0, 95)}...</p>
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
