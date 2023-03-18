import React, {useEffect} from 'react'
import HeaderComp from 'src/components/Header/HeaderComp';
import HeroComp from 'src/components/navPage/heroComp/HeroComp';
import FocusComp from 'src/components/navPage/FocusComp/FocusComp';
import NewsComp from 'src/components/navPage/NewsComp/NewsComp';
import SerialsComp from 'src/components/navPage/SerialsComp/SerialsComp';
import MoviesComp from 'src/components/navPage/MoviesComp/MoviesComp';
import CompilationComp from 'src/components/navPage/CompilationComp/CompilationComp';
import AboutComp from 'src/components/navPage/AboutComp/AboutComp';
import CalendarComp from 'src/components/navPage/calendarComo/calendarComp';
import Footer from 'src/components/Footer/Footer';

import { useRouter } from 'next/router';




export default function Home() {
  useEffect(()=>{
    const isAuth = localStorage.getItem('isAuth');
    console.log(window.location.href)
  },[])
  return (
    <main>
      <HeaderComp/>
      <HeroComp />
      <FocusComp />

      <MoviesComp/>
      <SerialsComp/>
      <CompilationComp />
      <AboutComp />
      <CalendarComp />
      <Footer />
    </main>
  )
}
