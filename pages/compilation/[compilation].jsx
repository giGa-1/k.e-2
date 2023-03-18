import React from 'react'
import HeaderComp from './../../src/components/Header/HeaderComp';
import CompilationComp from './../../src/components/CompilationPage/CompilationComp';
import Footer from './../../src/components/Footer/Footer';


export default function () {
  return (
    <main>
        <HeaderComp />
        <CompilationComp />
        <Footer/>
    </main>
  )
}
