import React, {useEffect} from 'react'
import HeaderComp from '@/components/Header/HeaderComp'
import Footer from 'src/components/Footer/Footer';
import MoviePage from 'src/components/MoviePage/MoviePage';
import CalendarComp from 'src/components/navPage/calendarComo/calendarComp';
import CompilationComp from 'src/components/navPage/CompilationComp/CompilationComp';

export default function movie() {
  useEffect(()=>{
    const isAuth = localStorage.getItem('isAuth');
    if(!isAuth)window.location.href = '/sign'
  },[])
  return (
    <main>
        <HeaderComp/>
        <MoviePage />
        <CompilationComp />
        <CalendarComp />
        <Footer />
    </main>
  )
}
