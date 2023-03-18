import React, {useEffect} from 'react'
import HeaderComp from 'src/components/Header/HeaderComp';
import MediaComp from 'src/components/MediaPage/MediaComp';
import Footer from 'src/components/Footer/Footer';




export default function Home() {
  useEffect(()=>{
    const isAuth = localStorage.getItem('isAuth');
    console.log(window.location.href)
  },[])
  return (
    <main>
      <HeaderComp/>
      <MediaComp/>
      <Footer />
    </main>
  )
}
