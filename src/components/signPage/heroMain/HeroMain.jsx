import React, { useRef, useEffect, useState } from 'react';
import cl from './HeroMain.module.css';
import MyBtnFiled from '../../UI/MyBtnFiled/MyBtnFiled';
import Link from 'next/link';
import {useSelector, useDispatch} from 'react-redux'
import { setIsAnimation, setIsSign } from 'redux/authActive-reducer';
export default function HeroMain() {

  const backRef = useRef(null)

    useEffect(()=>{
      document.body.classList.add('scrollHidden')
    },[])

    // useEffect(()=>{
    //     backRef !== null && window.addEventListener('scroll', () => {
    //       if(backRef.current !== null) {
    //         backRef.current.style.setProperty('--scroll',window.pageYOffset / 350);
    //        if( backRef.current.classList.contains(cl.active) && window.pageYOffset <= 349) {
    //          backRef !== null && backRef.current.classList.remove(cl.active)
    //        } else if ( !backRef.current.classList.contains(cl.active) && window.pageYOffset >= 199) {
    //          backRef !== null && backRef.current.classList.add(cl.active)
    //        }
    //        if( backRef.current.classList.contains(cl.activeWhite) && window.pageYOffset <= 650) {
    //          backRef !== null && backRef.current.classList.remove(cl.activeWhite)
    //        } else if ( !backRef.current.classList.contains(cl.activeWhite) && window.pageYOffset >= 650) {
    //          backRef !== null && backRef.current.classList.add(cl.activeWhite)
    //        }
    //       }  
          
    //     }, false);
    //   },[])


  const state = useSelector(state=>state['Auth Animation'])
  const dispatch = useDispatch()




  return (
    <section className={state.isAnimation ? [cl.section, cl.activeAnimation].join` ` :cl.section}>
      <div ref={backRef} className={cl.back}>

      </div>
      
        <div className="container">
            <div className={cl.content}>
                <span className={cl.logo}>
                
                </span>
                <h1 className={cl.title}>Лучшие фильмы в одном месте и у вас под рукой</h1>
                  <div className={cl.btnsBlock}>
                    <div className={cl.btnSignIn} onClick={e=>{dispatch(setIsAnimation(true));dispatch(setIsSign(true))}}>
                      Войти
                    </div>
                    <MyBtnFiled classBtn={cl.btn} onClick={()=>{dispatch(setIsAnimation(true));;dispatch(setIsSign(false))}}>
                        Зарегестрироваться
                    </MyBtnFiled>
                  </div>
            </div>
        </div>
    </section>
  )
}
