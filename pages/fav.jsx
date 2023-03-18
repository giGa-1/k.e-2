import React from 'react'
import HeaderComp from 'src/components/Header/HeaderComp';
import Footer from 'src/components/Footer/Footer';

import FavoritComp from '../src/components/FavoritPage/FavoritComp'

export default function favorits() {
  return (
    <div>
       <HeaderComp/>
       <FavoritComp />
      <Footer />
    </div>
  )
}
