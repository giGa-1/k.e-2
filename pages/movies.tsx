import Footer from '@/components/Footer/Footer'
import HeaderComp from '@/components/Header/HeaderComp'
import React from 'react'
import SerialsMoviesPage from '@/components/SerialsMoviesPage';
import { useEffect } from 'react';
import MovieFavorit from '@/components/MoviePage/MovieFavorit';
import CompilationComp from '@/components/navPage/CompilationComp/CompilationComp';
import CalendarComp from 'src/components/navPage/calendarComo/CalendarComp';

export default function movies() {
 
  return (
    <main>
        <HeaderComp/>
        <SerialsMoviesPage title='Фильмы' />
        <CompilationComp stateTypeComp='comp' />
        <CalendarComp />



        <Footer/>
    </main>
  )
}
