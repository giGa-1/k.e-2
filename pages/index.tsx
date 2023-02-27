import React, {useEffect} from 'react'
import HeaderComp from 'src/components/Header/HeaderComp';
import HeroComp from 'src/components/navPage/heroComp/HeroComp';
import FocusComp from 'src/components/navPage/FocusComp/FocusComp';
import NewsComp from 'src/components/navPage/NewsComp/NewsComp';
import SerialsComp from 'src/components/navPage/SerialsComp/SerialsComp';
import MoviesComp from 'src/components/navPage/MoviesComp/MoviesComp';
import { useRouter } from 'next/router';



export default function Home() {
  const router = useRouter()
  useEffect(()=>{
    const isAuth = localStorage.getItem('isAuth');
    !isAuth&&router.push('/sign')
  },[])
  return (
    <main>
      <HeaderComp/>
      <HeroComp />
      <FocusComp />
      <NewsComp />
     
      <MoviesComp/>
      <SerialsComp/>

    </main>
  )
}
