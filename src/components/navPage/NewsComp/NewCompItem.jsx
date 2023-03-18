import React from 'react';
import cl from './NewComp.module.css';
import { setNewsCompItem } from 'redux/NewsComp-reducer';
import {useDispatch} from 'react-redux';
import { replacerComments } from '@/untils/Replacer';

export default function NewCompItem({title, descr, id, active}) {
    const dispatch = useDispatch()
  return (
    // <div className={active ? [cl.itemAcc,cl.activeAcc].join` ` :cl.itemAcc} onClick={e=>dispatch(setNewsCompItem({id:id}))}>
    //     <div className={cl.itemHead}>
    //         <span>{title}</span>
    //         <div className={cl.linesBlock}> 
    //             <span className={cl.linesHor}></span>
    //             <span className={cl.linesVer}></span>
    //         </div>
    //     </div>
    //     <div className={cl.bodyItem}>
    //         <span>{replacerComments(descr, '__', <br/>)}</span>
    //     </div>
    // </div>
    <li className={cl.itemNews}>
        <div className={id%2===0 ? [cl.itemContent, cl.itemRight].join` ` :cl.itemContent}>
            <div className={cl.itemBlock}>
                <div className={cl.itemImg}>
                    <img className={cl.img} src={'/img/back-news.jpg'}/>
                </div>
                <div className={cl.itemTexts}>
                    <h2 className={cl.itemTitle}>
                        {title}
                    </h2>
                    <p className={cl.itemDescr}>
                        {replacerComments(descr, '__', <br/>)}
                    </p>
                </div>
            </div>
            <div className={cl.line}>
                <span>

                </span>
            </div>
        </div>
    </li>
  )
}
