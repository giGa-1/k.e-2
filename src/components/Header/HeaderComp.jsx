import React from 'react'
import cl from './HeaderComp.module.css'
import Link from 'next/link'
import MySearch from './../UI/MySearch/MySearch';

export default function HeaderComp() {
  return (
    <header className={cl.header}>
        <div className="container">
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
                                    <span className={cl.itemText}>Фильмы</span>
                                </Link>
                            </li>
                            <li className={cl.itemNav}>
                                <Link href={'/serials'}>
                                    <span className={cl.itemText}>Сериалы</span>
                                </Link>
                            </li>
                            <li className={cl.itemNav}>
                                <Link href={'/media'}>
                                    <span className={cl.itemText}>Медиа</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className={cl.authBlock}>
                        <Link href={'/fav'}>
                            <span className={cl.favorites}>

                            </span>
                        </Link>
                        <Link href={'/profile'}>
                            <span className={cl.profileAuth}>

                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
