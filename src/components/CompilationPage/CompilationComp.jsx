import React, { useEffect, useState } from 'react'
import cl from './CompilationComp.module.css';
import { useDispatch, useSelector } from 'react-redux';
import MyTitleComp from './../UI/MyTitleComp/MyTitleComp'
import {setCompilListPage} from './../../../redux/compilationList-reducer';
import {getMoviesBlankAPI} from './../../untils/API/getMoviesBlankAPI';
import CompilationItem from './CompilationItem';
export default function CompilationPage({top, stateTypeComp=true}) {
    const dispatch = useDispatch()
    const stateCompilation = useSelector((state)=>state['Compilation List Page'])
    useEffect(()=>{
        const response = getMoviesBlankAPI(stateCompilation.filter(e=>e.id==top)[0].fetch)
        response.then((data)=>{
            dispatch(setCompilListPage({id:top,list:data}))
        })
    },[])
    const [isTop, setIsTop] = useState(1);
   useEffect(()=>{
    setIsTop(top)
   },[])
   console.log( stateCompilation.filter(e=>e.id==isTop)[0].list)
  return (
    <section className={cl.section}>
        <div className={["miniCont",cl.miniCont].join` `}>
            <MyTitleComp classTitle={cl.title} isCenter={false} additionlySvg={''}>{ stateCompilation.filter(e=>e.id==isTop)[0].nameTop}</MyTitleComp>
            <div className={cl.listBlock}>
                <ul className={cl.list}>
                    {
                        stateCompilation.filter(e=>e.id==isTop)[0].list.map((e,i)=>{
                            return (  
                            <React.Fragment key={i}>
                                <CompilationItem genre={e.genres[0]} id={e.id} votes={e.votes} country={e.counties[0]} rating={e.rating} title={e.name} index={i+1} img={e.url} year={e.year} />
                            </React.Fragment>
                            )
                          
                        })
                    }
                </ul>
            </div>
        </div>
    </section>
  )
}
