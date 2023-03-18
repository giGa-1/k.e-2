import React, {useMemo, useState, useRef} from "react";
import cl from './MyInput.module.css';

const MyInput = ({classesInput, classesPlace, place, setInput, valueInput, ...props})=>{

    return (
        <label className={cl.inputBlock} htmlFor="inp">
            <input required id="inp" className={[cl.myInput, classesInput].join` `}  value={valueInput} onChange={e=>{e.preventDefault(); setInput(e.target.value)}} {...props}/>
            <span className={[cl.inputPlace, classesPlace].join` `}>{place}</span>
        </label>
       
    )
}

export default MyInput