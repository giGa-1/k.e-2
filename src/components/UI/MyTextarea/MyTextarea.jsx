import React from 'react'
import cl from './MyTextarea.module.css'

export default function MyTextarea({classesTextarea, classesPlace, place, setTextarea, textarea, textareaValue}) {
  return (
    <label className={cl.textareaBlock} htmlFor='txt'>
        <textarea required id='txt' className={[cl.myTextarea, classesTextarea].join` `} value={textareaValue} onChange={e=>setTextarea(e.target.value)}/>
        <span className={[cl.textareaPlace, classesPlace].join` `}>{place}</span>
    </label>
  )
}
