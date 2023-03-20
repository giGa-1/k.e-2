import React, {useEffect} from 'react'
import HeaderComp from '@/components/Header/HeaderComp'
import Footer from 'src/components/Footer/Footer';
import MoviePage from 'src/components/MoviePage/MoviePage';
import CalendarComp from 'src/components/navPage/calendarComo/CalendarComp';
import CompilationComp from 'src/components/navPage/CompilationComp/CompilationComp';

export default function movie() {
 
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
