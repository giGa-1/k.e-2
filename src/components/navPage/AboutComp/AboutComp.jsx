import React from 'react'
import cl from './AboutComp.module.css'
import MyTitleComp from './../../UI/MyTitleComp/MyTitleComp'

import { useInView } from 'react-intersection-observer';


export default function AboutComp() {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
 
  return (
    <section className={inView ? [cl.section, cl.activeSection].join` ` :cl.section}>
        <div className="container">
        <div className={cl.mminiCont}>
          <MyTitleComp classTitle={cl.title} isCexter={false} additionlySvg={''}>О нас</MyTitleComp>

        </div>
        <p ref={ref} className={inView ? [cl.descr, cl.activeDesr].join` ` : cl.descr}>
        Добро пожаловать на наш сайт, посвященный миру кино! Здесь вы найдете самые свежие новости и обзоры о фильмах и сериалах, которые только появились на больших экранах или потоковых платформах.
    <br/>
    <br/>

    Мы следим за всеми новинками киноиндустрии и стараемся держать вас в курсе самых интересных и ожидаемых премьер. На нашем сайте вы сможете узнать о сюжетах фильмов, режиссерах, актерах и критических отзывах.


    Кроме того, мы предлагаем рубрики, в которых вы сможете найти подборки фильмов по жанрам и темам, а также рекомендации нашей команды для просмотра в выходные или на праздники.
    <br/>
    <br/>

    Наши обзоры написаны профессиональными кинокритиками, которые имеют многолетний опыт работы в этой сфере. Вы можете быть уверены, что мы предоставляем вам только высококачественную информацию о фильмах.
    <br/>
    <br/>

    Также мы поддерживаем активное коммуникативное сообщество наших читателей, которые могут высказывать свои мнения в комментариях.


    Мы надеемся, что наш сайт поможет вам сделать правильный выбор и насладиться просмотром новых и захватывающих фильмов!

        </p>
        </div>
    </section>
  )
}
