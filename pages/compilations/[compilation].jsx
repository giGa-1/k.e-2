import { useEffect } from 'react';
import React from 'react'
import HeaderComp from '../../src/components/Header/HeaderComp';
import CompilationPage from '../../src/components/CompilationPage/CompilationComp';
import Footer from '../../src/components/Footer/Footer';
import CompilationComp from 'src/components/navPage/CompilationComp/CompilationComp';



export default function compilationItem() {



  return (
    <main>
        <HeaderComp />
        <CompilationPage  top={typeof window !== 'undefined'&&+`${window.location.href}`.split`/`[`${window.location.href}`.split`/`.length-1]}/>
        <CompilationComp />

        <Footer/>
    </main>
  )
}
