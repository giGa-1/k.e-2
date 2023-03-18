import React from 'react'
import cl from  './FocusComp.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import FocusCompItem from './FocusCompItem';
import MyTitleComp from './../../UI/MyTitleComp/MyTitleComp'

import { useInView } from 'react-intersection-observer';
import { Navigation } from 'swiper';
import Link from 'next/link';

export default function FocusComp() {

    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: .2,
      });

      const [ refSwiper, inViewSwiper] = useInView({
        /* Optional options */
        threshold: 0,
      });
    
    const state = useSelector(state=>state['Focus Comp'])
    console.log(state)
    return (
    <div ref={ref} className={inView ? [cl.section, cl.activeSection].join` ` : cl.section}>
        <div className="container">
            <div className={[cl.content, 'miniCont'].join` `}>
                <MyTitleComp classTitle={cl.title}>Будьте в курсе всех событий!</MyTitleComp>
                <div className={cl.newsBlock}>
                    <div className={cl.newsLeftBlock}>
                        <Link href={'/news/'+state.gridInfo[0].href} className={cl.link}>
                            <div className={[cl.newsTopBlock, cl.newsItem].join` `}>
                                <img src={state.gridInfo[0].img} className={cl.imgItem}/>
                                <div className={cl.itemContent}>
                                    <p className={cl.itemDescr}>{state.gridInfo[0].title}</p>
                                </div>
                            </div>
                        </Link>
                        <div className={[cl.newsBottomBlock, cl.newsBottomLeft].join` `}>
                            <Link href={'/news/'+state.gridInfo[1].href} className={cl.link}>
                                <div className={cl.newsItem}>
                                    <img src={state.gridInfo[1].img} className={cl.imgItem}/>
                                    <div className={cl.itemContent}>
                                        <p className={cl.itemDescr}>{state.gridInfo[1].title}</p>
                                    </div>
                                </div>
                            </Link>
                            <Link href={'/news/'+state.gridInfo[2].href} className={cl.link}>
                                <div className={cl.newsItem}>
                                    <img src={state.gridInfo[2].img} className={cl.imgItem}/>
                                    <div className={cl.itemContent}>
                                        <p className={cl.itemDescr}>{state.gridInfo[2].title}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={cl.newsRightBlock}>
                        <div className={[cl.newsTopBlock, cl.newsTopRight].join` `}>
                            <div className={cl.newsTopRightContent}>
                                <Link href={'/news/'+state.gridInfo[3].href} className={cl.link}>
                                    <div className={cl.newsItem}>
                                        <img src={state.gridInfo[3].img} className={cl.imgItem}/>
                                        <div className={cl.itemContent}>
                                            <p className={cl.itemDescr}>{state.gridInfo[3].title}</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link href={'/news/'+state.gridInfo[4].href} className={cl.link}>
                                    <div className={cl.newsItem}>
                                        <img src={state.gridInfo[4].img} className={cl.imgItem}/>
                                        <div className={cl.itemContent}>
                                            <p className={cl.itemDescr}>{state.gridInfo[4].title}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <Link href={'/news/'+state.gridInfo[6].href} className={cl.link}>
                                    <div className={[cl.newsItem, cl.newsText].join` `}>
                                        <p className={cl.textItem}>
                                            {state.gridInfo[6].descr.slice(0, 400)}...
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
                        <Link href={'/news/'+state.gridInfo[5].href} className={cl.link}>
                            <div className={[cl.newsBottomBlock, cl.newsItem].join` `}>
                            <img src={state.gridInfo[5].img} className={cl.imgItem}/>
                                <div className={cl.itemContent}>
                                    <p className={cl.itemDescr}>{state.gridInfo[5].title}</p>
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
                        
                        {state.swiperInfo.map(e=>{
                            return (
                                <SwiperSlide key={e.id} className={cl.swiperSlide}>
                                    <Link href={'/news/'+e.href} className={cl.link}>
                                    <FocusCompItem  title={e.title} img={e.img}/>
                                    </Link>
                                   
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    </div>
  )
}
