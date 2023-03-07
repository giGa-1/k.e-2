import Footer from '@/components/Footer/Footer'
import HeaderComp from '@/components/Header/HeaderComp'
import React from 'react'
import SerialsMoviesPage from '@/components/SerialsMoviesPage';

export default function movies() {
  return (
    <main>
        <HeaderComp/>
        <SerialsMoviesPage title='Фильмы'/>
        <Footer/>
    </main>
  )
}
