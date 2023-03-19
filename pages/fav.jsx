import React from 'react'
import { useEffect } from 'react';
import HeaderComp from 'src/components/Header/HeaderComp';
import Footer from 'src/components/Footer/Footer';

import FavoritComp from '../src/components/FavoritPage/FavoritComp'

export default function favorits() {
  useEffect(()=>{
    const isAuth = localStorage.getItem('isAuth');
    if(!isAuth)window.location.href = '/sign'
  },[])
  return (
    <div>
       <HeaderComp/>
       <FavoritComp />
      <Footer />

    </div>
  )
}
