import React, { useRef, useState } from 'react'
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import MyTitleComp from './../../UI/MyTitleComp/MyTitleComp'
import cl from './CalendarComp.module.css'

export default function CalendarComp() {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const monthNames = useSelector(state=>state['Months'])

    const dateElement = useRef('')
    const calendarTitle = useRef('')


    let filledArr = [];
    filledArr.length = currentDate.daysInMonth() + currentDate.startOf("month").day()
    filledArr.fill('')

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







  return (
    <section className={cl.section}>
        <div className="container">
        <MyTitleComp classTitle={cl.title} isCenter={false} additionlySvg={''}>Расписание новинок кино</MyTitleComp>
            <div className={cl.blockCalendar}>
                <div  className={cl.calendar}>
                    <div className={cl.calendarTitle}>
                        <div ref={calendarTitle} className={cl.calendarTitleText}>{`${monthNames[currentDate.month()]} - ${currentDate.year()}`}</div>
                        <div className={cl.calendarButtonGroup}>
                        <button className={cl.prevMonth} onClick={e=>prevBtn(e)}></button>
                        <button className={cl.today} onClick={e=>todayBtn(e)}>Today</button>
                        <button className={cl.nextMonth} onClick={e=>nextBtn(e)}></button>
                        </div>
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
                        {filledArr.map((e,i,arr)=>{
                            if (i < currentDate.startOf("month").day()) {
                                return <button className={[cl.calendarDatesDayEmpty, cl.dates].join` `}></button>
                            } else {
                                return <button className={[cl.calendarDatesDay, cl.dates].join` `} onClick={e=>{setIsActive({...isActive[0], [isActive[1]]: !{...isActive[0]}[isActive[1]]});setIsCalendar(`${e.target.textContent} ${monthNames[currentDate.month()]} ${currentDate.year()}`)}}>
                                        <span>
                                            {i+1-currentDate.startOf("month").day()}
                                        </span>
                                        <div className={cl.dateRelease}>
                                            <span className={cl.datimg}>

                                            </span>
                                            <span className={cl.dataText}>
                                                Test name film
                                            </span>
                                        </div>
                                    </button>
                            }
                            
                        })}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
