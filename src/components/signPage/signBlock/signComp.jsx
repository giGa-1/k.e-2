import React, { useMemo, useState } from 'react';
import cl from './SignBlock.module.css';
import {useSelector, useDispatch} from 'react-redux'
import { authAnimationState } from 'redux/authActive-reducer';
import { applyMiddleware } from '@reduxjs/toolkit';
import MyInput from './../../UI/MyInput/MyInput';
import MyBtnFiled from '../../UI/MyBtnFiled/MyBtnFiled';

import Link from 'next/link';
import {setNewUserReg} from 'src/untils/API/setNewUserReg';
import {setUserSignIn} from 'src/untils/API/setUserSignIn';

export default function SignComp() {
  const [isInputMail,setIsInputMail] = useState('')
  const [isInputPassword,setIsInputPassword] = useState('')
  const [isInputInitials,setIsInputInitials] = useState('')
  const [isFormComplited, setIsFormComplited] = useState(false)
  const {isAnimation, isSign} = useSelector(state=>state['Auth Animation'])
  const dispatch = useDispatch()


  const handleFuncBtn = (e) => {
    e.preventDefault()

    const resultFormInfo = !isSign ? setNewUserReg(isInputInitials,isInputMail,isInputPassword ) :  setUserSignIn(isInputMail,isInputPassword ) 
    resultFormInfo.then(res=>{
      if(res.status==='ok'){localStorage.setItem('isAuth', true);localStorage.setItem('authInfo', JSON.stringify({password:isInputPassword,mail:isInputMail,initials:isInputInitials}));window.location.href = '/';console.log(res.status)}
    })
  }




  useMemo(()=>{
    isSign ? isInputMail.length>0&&isInputPassword.length>0&&setIsFormComplited(true)  : isInputMail.length>0&&isInputPassword.length>0&&isInputInitials.length>0&&setIsFormComplited(true)
  },[isInputMail,isInputPassword,isInputInitials])


  return (
    <div className={isAnimation ? [cl.section, cl.activeAnimation].join` ` : cl.section}>
        <div className={cl.back}>

        </div>
        <div className="container">
          <div className={cl.wrapper}>
            <div className={cl.content}>
              <h2 className={cl.titleSign}>{isSign ? 'Войти' : 'Регистрация'}</h2>
                <div className={cl.formBlock}>
                  {
                    isSign ? 
                      <form className={cl.formSign} id='sign'>
                        <div className={cl.formInputs}>
                          <MyInput classesInput={cl.input} classesPlace={cl.place} required={true} place={'Почта'} setInput={setIsInputMail} valueInput={isInputMail} form='sign' />
                          <MyInput classesInput={cl.input} classesPlace={cl.place} required={true} type="password" place={'Пароль'} setInput={setIsInputPassword} valueInput={isInputPassword} form='sign'/>
                        </div>
                         

                          <MyBtnFiled classBtn={cl.btn} form='sign' handleFunc={handleFuncBtn}>Отправить</MyBtnFiled>

                      </form>
                        :
                        <form className={cl.formSign} id='sign'>
                          <div className={cl.formInputs}>

                            <MyInput classesInput={cl.input} classesPlace={cl.place} required={true} place={'Имя'} setInput={setIsInputInitials} valueInput={isInputInitials} form='sign'/>
                            <MyInput classesInput={cl.input} classesPlace={cl.place} required={true} place={'Почта'} setInput={setIsInputMail} valueInput={isInputMail} form='sign' />
                            <MyInput classesInput={cl.input} classesPlace={cl.place} required={true} type={'password'} place={'Пароль'} setInput={setIsInputPassword} valueInput={isInputPassword} form='sign'/>
                          </div>
                          {
                            isFormComplited ? 

                             
                                <MyBtnFiled classBtn={cl.btn} form='sign' handleFunc={handleFuncBtn}>Отправить</MyBtnFiled>
                              
                            :
                              <MyBtnFiled classBtn={cl.btn} form='sign' handleFunc={handleFuncBtn}>Отправить</MyBtnFiled>
                          }
                         
                        </form>
                  }
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}
