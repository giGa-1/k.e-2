import React, {useEffect, useState, useMemo} from 'react';
import cl from './MediaComp.module.css';
import MyTitleComp from './../UI/MyTitleComp/MyTitleComp'
import { useDispatch, useSelector } from 'react-redux';
import { setTabsMediaActive } from 'redux/tabsMedia-reducer';
import { getNewsAPIjs } from 'src/untils/API/getNewsAPI';
import MediaAllComp from './MediaAllComp';
import MediaNewsComp from './MediaNewsComp'
import MediaVideosComp from './MediaVideosComp'
import MediaArticlesComp from './MediaArticlesComp'
const  MediaComp = () => {
    const tabsState= useSelector(state=>state['Tabs Media']);
    const [stateArrNews, setStateArrNews] = useState(0);
    const dispatch = useDispatch();

    
   
    
    console.log(tabsState)
  return (
    <section className={cl.section}>
         <div className="container">
         <div className={cl.headContent}>
             <MyTitleComp classTitle={cl.title} isCenter={false} additionlySvg={''}>Медиа</MyTitleComp>
             <div className={cl.tabsBlock}>
                 <ul className={cl.tabsList}>
                     {
                         tabsState.map(e=>{
                             return (
                                 <React.Fragment key={e.id}>
                                     <li className={e.active ? [cl.itemTabs, cl.tebsActive].join` ` : cl.itemTabs} onClick={event=>dispatch(setTabsMediaActive({id:e.id}))}>
                                         {e.title}
                                     </li>
                                 </React.Fragment>
                             )
                         })
                     }
                 </ul>   
             </div>
         </div>
         <div className={cl.contentBody}>
            <div className={tabsState[0].active ? [cl.tabsBody, cl.bodyActive].join` ` : cl.tabsBody}>
                <MediaAllComp />
            </div>
            <div className={tabsState[1].active ? [cl.tabsBody, cl.bodyActive].join` ` : cl.tabsBody}>
                <MediaNewsComp />
            </div>
         
            <div className={tabsState[2].active ? [cl.tabsBody, cl.bodyActive].join` ` : cl.tabsBody}>
                <MediaArticlesComp />
            </div>
            
         </div>
     </div>
    </section>
  )
}

export default MediaComp