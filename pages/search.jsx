import React from 'react'
import HeaderComp from 'src/components/Header/HeaderComp';
import Footer from 'src/components/Footer/Footer';
import MoviesComp from 'src/components/navPage/MoviesComp/MoviesComp';
import SerialsComp from 'src/components/navPage/SerialsComp/SerialsComp';
import SearchComp from '../src/components/Search/SearchComp';

export default function search() {
  return (
    <main>  
      <HeaderComp/>
      <SearchComp/>
      <MoviesComp/>
      <SerialsComp/>
      <Footer />

    </main>
  )
}
