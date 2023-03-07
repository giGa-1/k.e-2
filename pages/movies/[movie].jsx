import React from 'react'
import HeaderComp from '@/components/Header/HeaderComp'
import Footer from 'src/components/Footer/Footer';
import MoviePage from 'src/components/MoviePage/MoviePage';

export default function movie() {
  return (
    <main>
        <HeaderComp/>
        <MoviePage />
        <Footer />
    </main>
  )
}
