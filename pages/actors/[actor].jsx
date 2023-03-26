import React, {useEffect, useState, useMemo} from 'react'
import { getOfficialYandexMovies } from 'src/untils/API/getOfficialYandexMovies';
import SerialsComp from 'src/components/navPage/SerialsComp/SerialsComp';
import MoviesComp from 'src/components/navPage/MoviesComp/MoviesComp';
import ActorPage from '../../src/components/Actors/ActorPage'
import HeaderComp from '@/components/Header/HeaderComp'
import Footer from 'src/components/Footer/Footer';
import {useSelector, useDispatch} from 'react-redux'
import CompilationComp from '@/components/navPage/CompilationComp/CompilationComp';


export default function actor() {
    

  return (
    <main>
        <HeaderComp />
        <ActorPage idActor={typeof window !== "undefined"&& `${window.location.href}`.split`/`[`${window.location.href}`.split`/`.length-1]}/>
        <MoviesComp/>
      <SerialsComp/>
      <CompilationComp stateTypeComp='comp' />

        <Footer />
    </main>
  )
}
