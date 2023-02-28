import React from 'react'
import cl from './AboutComp.module.css'
import MyTitleComp from './../../UI/MyTitleComp/MyTitleComp'

export default function AboutComp() {
  return (
    <section className={cl.section}>
        <div className="container">
        <MyTitleComp classTitle={cl.title} isCenter={false} additionlySvg={''}>О нас</MyTitleComp>
        <p className={cl.descr}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam repellat voluptatibus ea ipsum, eveniet harum id ullam facilis, recusandae numquam eos dolor assumenda similique iure fugiat accusantium corporis? Officiis, obcaecati?
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam repellat voluptatibus ea ipsum, eveniet harum id ullam facilis, recusandae numquam eos dolor assumenda similique iure fugiat accusantium corporis? Officiis, obcaecati?
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam repellat voluptatibus ea ipsum, eveniet harum id ullam facilis, recusandae numquam eos dolor assumenda similique iure fugiat accusantium corporis? Officiis, obcaecati?
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam repellat voluptatibus ea ipsum, eveniet harum id ullam facilis, recusandae numquam eos dolor assumenda similique iure fugiat accusantium corporis? Officiis, obcaecati?

        </p>
        </div>
    </section>
  )
}
