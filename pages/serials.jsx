import { useEffect } from 'react';
import Footer from '@/components/Footer/Footer'
import HeaderComp from '@/components/Header/HeaderComp'
import React from 'react'
import SerialsMoviesPage from '@/components/SerialsMoviesPage';

import CompilationComp from '@/components/navPage/CompilationComp/CompilationComp';
import CalendarComp from 'src/components/navPage/calendarComo/calendarComp';

export default function movies() {
  useEffect(()=>{
    const isAuth = localStorage.getItem('isAuth');
    if(!isAuth)window.location.href = '/sign'
  },[])
  return (
    <main>
        <HeaderComp/>
        <SerialsMoviesPage title='Сериалы' isSerial={true}/>

        <CompilationComp stateTypeComp='comp' />
        <CalendarComp />

        <Footer/>
    </main>
  )
}
