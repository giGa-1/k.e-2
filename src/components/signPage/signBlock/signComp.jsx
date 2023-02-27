import React, { useMemo, useState } from 'react';
import cl from './SignBlock.module.css';
import {useSelector, useDispatch} from 'react-redux'
import { authAnimationState } from 'redux/authActive-reducer';
import { applyMiddleware } from '@reduxjs/toolkit';
import MyInput from './../../UI/MyInput/MyInput';
import MyBtnFiled from '../../UI/MyBtnFiled/MyBtnFiled';
import { useRouter } from 'next/router';
import Link from 'next/link';


export default function SignComp() {
  const [isInputMail,setIsInputMail] = useState('')
  const [isInputPassword,setIsInputPassword] = useState('')
  const [isInputInitials,setIsInputInitials] = useState('')
  const [isFormComplited, setIsFormComplited] = useState(false)
  const {isAnimation, isSign} = useSelector(state=>state['Auth Animation'])
  const dispatch = useDispatch()





  const handleFuncBtn = () => {
    const resultFormInfo = !isSign ? {mail: isInputMail, password: isInputPassword, initials: isInputInitials} : {mail: isInputMail, password: isInputPassword}
    console.log(resultFormInfo)
    localStorage.setItem('isAuth', true)
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
                         
                          <MyBtnFiled classBtn={cl.btn} form='sign' handleFunc={e=>handleFuncBtn(true)}>Отправить</MyBtnFiled>

                      </form>
                        :
                        <form className={cl.formSign} id='sign'>
                          <div className={cl.formInputs}>
                            <MyInput classesInput={cl.input} classesPlace={cl.place} required={true} place={'ФИО'} setInput={setIsInputInitials} valueInput={isInputInitials} form='sign'/>
                            <MyInput classesInput={cl.input} classesPlace={cl.place} required={true} place={'Почта'} setInput={setIsInputMail} valueInput={isInputMail} form='sign' />
                            <MyInput classesInput={cl.input} classesPlace={cl.place} required={true} type={'password'} place={'Пароль'} setInput={setIsInputPassword} valueInput={isInputPassword} form='sign'/>
                          </div>
                          {
                            isFormComplited ? 
                              <Link href={'/'} >
                                <MyBtnFiled classBtn={cl.btn} form='sign' handleFunc={e=>handleFuncBtn()}>Отправить</MyBtnFiled>
                              </Link>
                            :
                              <MyBtnFiled classBtn={cl.btn} form='sign' handleFunc={e=>handleFuncBtn()}>Отправить</MyBtnFiled>
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
