import React, { useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import MyTitleComp from './../../UI/MyTitleComp/MyTitleComp'
import cl from './CalendarComp.module.css'
import CalendarItem from './CalendarItem';
import { setDateTextCalendar,setPremierMoviesCalendar } from 'redux/calendarComp-reducer';
import { useInView } from 'react-intersection-observer';
import {getReleaseDataAPI} from './../../../untils/API/getReleaseDataAPI';

export default function CalendarComp() {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const monthNames = useSelector(state=>state['Months'])

    const monthNamesText = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    const [activePremier, setActivePremier] = useState('');
    const activePremierState = useSelector(state=>state['Calendar Comp']) 

    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
      });

    const dispatch = useDispatch()
    const dateElement = useRef('')
    const calendarTitle = useRef('')


    let filledArr = [];
    filledArr.length = currentDate.daysInMonth() + currentDate.startOf("month").day()
    filledArr.fill('')

    const [dataRelease, setDataRelease] = useState([])

    const prevBtn = (e)=>{
        e.preventDefault();
        setCurrentDate(currentDate.subtract(1, "month").startOf("month"))
    }

    const nextBtn = (e)=>{
        e.preventDefault();
        setCurrentDate(currentDate.add(1, "month").startOf("month"))
    }

    const todayBtn = (e)=>{
        e.preventDefault();
        setCurrentDate(dayjs())
    }
    const [filedCeils,setFiledCeils] = useState([])
    useMemo(()=>{
        const getDataRelease = getReleaseDataAPI(currentDate.month())
        getDataRelease.then((data)=>{
            setDataRelease([...data[0], ...data[1], ...data[2], ...data[3]]);
            setFiledCeils(filledArr.map((e,i,arr)=>{
                if (i < currentDate.startOf("month").day()) {
                    return ``
                } else {
                    return {releases: [...data[0], ...data[1], ...data[2], ...data[3]].filter(e=>e.releaseDate.split`-`[2]==i-currentDate.startOf("month").day()),count:[...data[0], ...data[1], ...data[2], ...data[3]].filter(e=>e.releaseDate.split`-`[2]==i-currentDate.startOf("month").day()).length}
                }
            }))    ;
        })  
       
    },[currentDate])
    console.log(dataRelease)

    const changePremierCatalog = (e)=>{
        console.log(e);
        dispatch(setDateTextCalendar(`${e} ${monthNames[currentDate.month()]}`))
    }

   const changeListPremierCatalog = (e,list)=>{
        console.log(e);
        dispatch(setPremierMoviesCalendar(list))
   }

  return (
    <section className={cl.section}>

        <div ref={ref} className="container">
            <div className={cl.miniCont}>
                <MyTitleComp classTitle={cl.title} isCenter={false} additionlySvg={''}>Расписание новинок кино</MyTitleComp>
            </div>
            <div className={cl.cont}>
                <div className={inView ? [cl.calendarBlock, cl.calendarActive].join` ` : cl.calendarBlock}>
                
                    <div className={cl.calendarLeft}>
                    <div className={cl.blockCalendar}>
                    <div  className={cl.calendar}>
                        <div className={cl.calendarTitle}>
                          
                                <button className={cl.prevMonth} onClick={e=>prevBtn(e)}></button>
                                <div ref={calendarTitle} className={cl.calendarTitleText}  onClick={e=>todayBtn(e)}>{`${monthNames[currentDate.month()]} - ${currentDate.year()}`}</div>
                                <button className={cl.nextMonth} onClick={e=>nextBtn(e)}></button>
                        
                        </div>
                        <div className={cl.calendarDayName}>
                            <div>Пт</div>
                            <div>Вт</div>
                            <div>Ср</div>
                            <div>Чт</div>
                            <div>Пт</div>
                            <div>Сб</div>
                            <div>Вс</div>
                        </div>
                        <div ref={dateElement} className={cl.calendarDates}>
                            {filedCeils.length ? filedCeils.map((e,i,arr)=>{
                                if (i < currentDate.startOf("month").day()) {
                                    return <button key={i} className={[cl.calendarDatesDayEmpty, cl.dates].join` `}></button>
                                } else {
                                    // setIsCalendar(`${event.target.textContent} ${monthNames[currentDate.month()]} ${currentDate.year()}`);
                                    return <button key={i} className={[cl.calendarDatesDay, cl.dates].join` `} onClick={event=>{ changePremierCatalog(event.target.textContent);changeListPremierCatalog(event, e.releases)}}>
                                            <span className={cl.dateNumber}>
                                                <span className={cl.dateValue}>
                                                    {i+1-currentDate.startOf("month").day()}
                                                </span>
                                            </span>
                                            <div className={cl.dateRelease} >
                                                <span className={cl.datimg}>

                                                </span>
                                                <span className={cl.dataText}>
                                                    +{e.count}
                                                </span>
                                            </div>
                                        </button>
                                }
                                
                            })
                            :
                            filledArr.map((e,i,arr)=>{
                                if (i < currentDate.startOf("month").day()) {
                                    return <button key={i} className={[cl.calendarDatesDayEmpty, cl.dates].join` `}></button>
                                } else {
                                    // setIsCalendar(`${event.target.textContent} ${monthNames[currentDate.month()]} ${currentDate.year()}`);
                                    return <button key={i} className={[cl.calendarDatesDay, cl.dates].join` `} onClick={event=>{ changePremierCatalog(event.target.textContent);changeListPremierCatalog(event, e.releases)}}>
                                            <span className={cl.dateNumber}>
                                                <span className={cl.dateValue}>
                                                    {i+1-currentDate.startOf("month").day()}
                                                </span>
                                            </span>
                                            <div className={cl.dateRelease} >
                                                <span className={cl.datimg}>

                                                </span>
                                                <span className={cl.dataText}>
                                                    +{e.count}
                                                </span>
                                            </div>
                                        </button>
                                }
                                
                            })
                        }
                        </div>
                    </div>
                </div>
                    </div>
                 
                </div>
                <div className={inView ? [cl.calendarRight, cl.calendarActive].join` ` : cl.calendarRight}>
                        <div className={cl.headRightBlock}>
                            <p className={cl.headRIghtTitle}>
                                {`${activePremierState.dateText || `${dayjs().format('DD')} ${monthNames[currentDate.month()]}`} - новиники за этот день`}
                            </p>
                        </div>
                        <div className={cl.bodyRightBlock}>
                            <ul className={cl.bodyRightList}>
                                {
                                    activePremierState.premierMovies.map(e=>{
                                        return (
                                            <React.Fragment key={e.id}>
                                                <CalendarItem title={e.nameRu} titleEn={e.nameEn} img={e.posterUrl} datePremier={activePremierState.dateText || `${dayjs().format('DD')} ${monthNames[currentDate.month()]}`} />
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
            </div>
        </div>
    </section>
  )
}
