import React,{useEffect} from 'react'
import cl from './FavoritComp.module.css'
import MyTitleComp from './../UI/MyTitleComp/MyTitleComp'
import MoviesCompItem from './../navPage/MoviesComp/MoviesCompItem';
import { useSelector } from 'react-redux';
import { addFavAPI, getFavAPI } from '../../untils/API/getFavAPI';

export default function FavoritComp() {
  const stateFav = useSelector(state=>state['Fav State'])

  useEffect(()=>{
        const deleteFav = getFavAPI()
        deleteFav.then(data=>{
            console.log(data)
        })
    },[])

  return (
    <section className={cl.section}>
        {
            stateFav.videoContent  ? 
                <span className={cl.voidListText}>Видимо, вы еще не добавили ни одного фильма в избранное</span>
            :
            <div className="miniCont">
                <MyTitleComp classTitle={cl.title} isCenter={false} additionlySvg={''}>Ваше избранное</MyTitleComp>
                <div className={cl.listBlock}>
                    <ul className={cl.list}>
                        {
                            stateFav.videoContent.map(e=>{
                                return (
                                    <MoviesCompItem img={e.img} title={e.title} rating={e.rating} genre={e.genre} year={e.year} descr={e.description} idFilm={e.idFilm}/>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        }
    </section>
  )
}
