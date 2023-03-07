import React from 'react'
import { useSelector } from 'react-redux'

export default function favorits() {
  const stateFav = useSelector(state=>state['Fav State'])
  return (
    <div>
        {stateFav.map(e=><div>{e.id}</div>)}
    </div>
  )
}
