import React,{useEffect} from 'react'
import HeaderComp from 'src/components/Header/HeaderComp';
import Footer from 'src/components/Footer/Footer';
import NewsComp from '../../src/components/NewsComp/NewsComp';
import CompilationComp from 'src/components/navPage/CompilationComp/CompilationComp';

export default function newsItem() {
 
  return (
    <div>
      <HeaderComp/>
      <NewsComp id={typeof window !== 'undefined' &&  window.location.href.split`/`[window.location.href.split`/`.length-1]}/>
      <CompilationComp />
      
      <Footer />
    </div>
  )
}
