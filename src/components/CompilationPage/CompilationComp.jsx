import React, { useEffect, useState } from 'react'
import cl from './CompilationComp.module.css';
import { useDispatch, useSelector } from 'react-redux';
import MyTitleComp from './../UI/MyTitleComp/MyTitleComp'
import {setCompilListPage} from './../../../redux/compilationList-reducer';
import {getMoviesBlankAPI} from './../../untils/API/getMoviesBlankAPI';
import CompilationItem from './CompilationItem';
export default function CompilationPage({top, stateTypeComp=true}) {
    const dispatch = useDispatch()
    const [isLoader, setIsLoader] = useState(false)
    const stateCompilation = useSelector((state)=>state['Compilation List Page'])
    useEffect(()=>{
        const response = getMoviesBlankAPI(stateCompilation.filter(e=>e.id==top)[0].fetch)
        response.then((data)=>{
            dispatch(setCompilListPage({id:top,list:data}))
            setIsLoader(true)
        })
    },[])
    const [isTop, setIsTop] = useState(1);
   useEffect(()=>{
    setIsTop(top)
   },[])
   console.log( stateCompilation.filter(e=>e.id==isTop)[0].list)
  return (
    <section className={cl.section}>
          <div className={!isLoader ? ["loaderBLock", "loaderActive"].join` ` :"loaderBLock"}>
            <div className={"loader"}>
                <span className={"loadSvg"}>
                <svg version="1.1" id="loader-1"  x="0px" y="0px"
                    width="100px" height="100px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40" >
                    <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                    <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                        C22.32,8.481,24.301,9.057,26.013,10.047z">
                        <animateTransform attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 20 20"
                        to="360 20 20"
                        dur="0.5s"
                        repeatCount="indefinite"/>
                        </path>
                    </svg>
                </span>
            </div>
        </div>
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
