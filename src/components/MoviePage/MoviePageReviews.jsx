import React from 'react'
import cl from './MoviePage.module.css';

export default function MoviePageReviews({userPic='',rating='7.4',dateReview='4.03.2023', initialsUser = 'Bot 420691337', reviewUser = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.', ratingUser = [true,true,true,true,true,true,true,null,false,false]}) {
  return (
    <div className={cl.review}>
        <div className={cl.reviewItemHead}>
            <div className={cl.ratingWrap}>
                <div className={cl.ratingBlock}>
                    <span className={ratingUser[0] ? [cl.ratingPoint, cl.pointActive].join` ` :ratingUser[0]===null ? [cl.ratingPoint, cl.ratingFade].join` ` : cl.ratingPoint}></span>
                    <span className={ratingUser[1] ? [cl.ratingPoint, cl.pointActive].join` ` :ratingUser[1]===null ? [cl.ratingPoint, cl.ratingFade].join` ` : cl.ratingPoint}></span>
                    <span className={ratingUser[2] ? [cl.ratingPoint, cl.pointActive].join` ` :ratingUser[2]===null ? [cl.ratingPoint, cl.ratingFade].join` ` : cl.ratingPoint}></span>
                    <span className={ratingUser[3] ? [cl.ratingPoint, cl.pointActive].join` ` :ratingUser[3]===null ? [cl.ratingPoint, cl.ratingFade].join` ` : cl.ratingPoint}></span>
                    <span className={ratingUser[4] ? [cl.ratingPoint, cl.pointActive].join` ` :ratingUser[4]===null ? [cl.ratingPoint, cl.ratingFade].join` ` : cl.ratingPoint}></span>
                    <span className={ratingUser[5] ? [cl.ratingPoint, cl.pointActive].join` ` :ratingUser[5]===null ? [cl.ratingPoint, cl.ratingFade].join` ` : cl.ratingPoint}></span>
                    <span className={ratingUser[6] ? [cl.ratingPoint, cl.pointActive].join` ` :ratingUser[6]===null ? [cl.ratingPoint, cl.ratingFade].join` ` : cl.ratingPoint}></span>
                    <span className={ratingUser[7] ? [cl.ratingPoint, cl.pointActive].join` ` :ratingUser[7]===null ? [cl.ratingPoint, cl.ratingFade].join` ` : cl.ratingPoint}></span>
                    <span className={ratingUser[8] ? [cl.ratingPoint, cl.pointActive].join` ` :ratingUser[8]===null ? [cl.ratingPoint, cl.ratingFade].join` ` : cl.ratingPoint}></span>
                    <span className={ratingUser[9] ? [cl.ratingPoint, cl.pointActive].join` ` :ratingUser[9]===null ? [cl.ratingPoint, cl.ratingFade].join` ` : cl.ratingPoint}></span>
                </div>
                <p className={cl.ratingText}>- {rating}</p>
            </div>
           
            <div className={cl.dateReview}>{dateReview}</div>
        </div>
        <div className={cl.reviewItemContent}>
            <div className={cl.leftReview}>
                <div className={cl.userInfo}>
                    <div className={cl.userPic}>
                        <img src={userPic} className={cl.imgUser}/>
                    </div>
                    <p className={cl.userInitials}>{initialsUser}</p>
                </div>
            </div>
            <div className={cl.rightReview}>
                {reviewUser}
            </div>
        </div>
    </div>
  )
}
