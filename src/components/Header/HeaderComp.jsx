
import React, {useEffect, useState} from 'react'
import cl from './HeaderComp.module.css'
import Link from 'next/link'
import MySearch from './../UI/MySearch/MySearch';
import { useInView } from 'react-intersection-observer';
import MyInput from '../UI/MyInput/MyInput';
import MyBtnFiled from '../UI/MyBtnFiled/MyBtnFiled';

export default function HeaderComp() {


    const [isView, setIsView] = useState(false)
    const [isActiveProfile,setIsActiveProfile] = useState(false);
    const [modeChange,setModeChange] = useState(1)

    const [isInputConfirm,setIsInputConfirm] = useState('')
    const [isInputMail,setIsInputMail] = useState('')
    const [isInputPassword,setIsInputPassword] = useState('')

    useEffect(()=>{
        setIsView(true)
    },[])
    console.log('123123123132')
    console.log('123123123132')
    console.log('123123123132')
    console.log('123123123132')
    console.log('123123123132')
    console.log('123123123132')
    console.log('123123123132')
    console.log('123123123132')

  return (
    <header  className={isView ? [cl.header, cl.activeHeader].join` ` : cl.header}>
        <div className={isActiveProfile ? [cl.profileBlock, cl.profileActive].join` ` :cl.profileBlock}>
            <div className={cl.profileContent}>
                    <div className={cl.profileHead}>
                        <div className={cl.topBlock}>
                            <span className={[cl.profileAuth, cl.profileImg].join` `}>

                            </span>
                            <p className={cl.profileName}>Lorem Test1</p>
                        </div>
                        <div className={cl.profileChange}>
                            <h3 className={cl.profileText}>Изменить данные:</h3>
                            <div className={cl.profileBtns}>
                                <button className={modeChange===1 ? [cl.profileBtn, cl.profileBtnActive ].join` ` : cl.profileBtn} onClick={e=>setModeChange(1)}>
                                    Пароль
                                </button>   
                                <button className={modeChange===2 ? [cl.profileBtn, cl.profileBtnActive ].join` ` : cl.profileBtn} onClick={e=>setModeChange(2)}>
                                    Почту
                                </button>  
                            </div>
                        </div>
                    </div>
                    <div className={cl.profileInfo}>
                        {
                            modeChange===2 ? 
                                <form id='change' className={cl.formProfile}>
                                    <MyInput classesInput={cl.input} classesPlace={cl.place} required={true} place={'Почта'} setInput={setIsInputMail} valueInput={isInputMail} form='change' />
                                    <MyInput classesInput={cl.input} classesPlace={cl.place} required={true} type="password" place={'Подтвердите пароль'} setInput={setIsInputConfirm} valueInput={isInputConfirm} form='change'/>
                                    <MyBtnFiled classBtn={cl.btnProfile}>
                                        Подтвердить
                                    </MyBtnFiled>
                                </form>
                            :
                            <form id='change' className={cl.formProfile}>
                                <MyInput classesInput={cl.input} classesPlace={cl.place} required={true} place={'Старый пароль'} setInput={setIsInputPassword} valueInput={isInputPassword} form='change' />
                                <MyInput classesInput={cl.input} classesPlace={cl.place} required={true} type="password" place={'Новый пароль'} setInput={setIsInputConfirm} valueInput={isInputConfirm} form='change'/>
                                <MyBtnFiled classBtn={cl.btnProfile}>
                                    Подтвердить
                                </MyBtnFiled>
                            </form>

                        }
                    </div>
            </div>
        </div>
        <div className={isView ? ["container", cl.cont, cl.activeHeader].join` ` :  ["container", cl.cont].join` `}>
            <div className={cl.content}>

                <div className={cl.logoBlock}>
                    <Link href={'/'}>
                        <span className={cl.logo}>

                        </span>
                    </Link>
                    
                </div>
                <div className={cl.navBlock}>

                    <div className={cl.searchBlock}>
                        <MySearch classSearch={cl.search}/>
                    </div>

                    <nav className={cl.nav}>
                        <ul className={cl.listNav}>
                            <li className={cl.itemNav}>
                                <Link href={'/movies'}>

                                    <p className={cl.itemText}>
                                        <span className={cl.line}></span>    
                                        Фильмы
                                    </p>
                                </Link>
                            </li>
                            <li className={cl.itemNav}>
                                <Link href={'/serials'}>


                                    <p className={cl.itemText}>
                                    <span className={cl.line}></span>    
                                        Сериалы</p>
                                </Link>
                            </li>
                            <li className={cl.itemNav}>
                                <Link href={'/media'}>

                                    <p className={cl.itemText}>
                                    <span className={cl.line}></span>    
                                        Медиа</p>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className={cl.authBlock}>
                        <Link href={'/fav'}>
                            <span className={cl.favorites}>

                            </span>
                        </Link>

                        
                            <span className={cl.profileAuth} onClick={e=>setIsActiveProfile(!isActiveProfile)}>

                            </span>
                       
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
