import React,{useEffect} from 'react'
import HeaderComp from 'src/components/Header/HeaderComp';
import Footer from 'src/components/Footer/Footer';

export default function () {
  useEffect(()=>{
    const isAuth = localStorage.getItem('isAuth');
    if(!isAuth)window.location.href = '/sign'
  },[])
  return (
    <div>
      <HeaderComp/>

      <Footer />
    </div>
  )
}
