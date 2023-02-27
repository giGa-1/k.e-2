import { useSelector } from 'react-redux';
import React from 'react'
import HeaderComp from '@/components/Header/HeaderComp';
import FocusPage from '@/components/FocusPage/FocusPage';
import { useRouter } from 'next/router';
export default function Events() {

  const state = useSelector((state)=>state['Focus Comp'])
  const router = useRouter()
  return (
    <main>
        <HeaderComp/>
        <FocusPage state={state.filter(e=>e.id==router.query.event)[0]}/>
    </main>
  )
}
