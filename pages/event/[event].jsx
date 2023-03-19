import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import React from 'react'
import HeaderComp from '@/components/Header/HeaderComp';
import FocusPage from '@/components/FocusPage/FocusPage';
import { useRouter } from 'next/router';
import Footer from '@/components/Footer/Footer';
import CompilationComp from 'src/components/navPage/CompilationComp/CompilationComp';
import EventPage from 'src/components/eventPage/EventPage';
export default function Events() {

 
  return (
    <main>
        <HeaderComp/>
        <EventPage id={typeof window !== 'undefined' &&window.location.href.split`/`[window.location.href.split`/`.length-1]}/>
        <CompilationComp />
        <Footer />
    </main>
  )
}
