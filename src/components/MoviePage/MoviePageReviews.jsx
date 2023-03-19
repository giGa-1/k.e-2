import React from 'react'
import cl from './MoviePage.module.css';

export default function MoviePageReviews({initialsUser = 'Bot 420691337', reviewUser = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae magni perspiciatis corporis sunt maiores aspernatur dolor, assumenda odit, voluptate eaque dolore  incidunt sequi obcaecati possimus ea atque a omnis ut.', ratingUser = [true,true,true,true,true,true,true,null,false,false]}) {
  return (
    <div className={cl.review}>
       
        <div className={cl.reviewItemContent}>
            <div className={cl.leftReview}>
                <div className={cl.userInfo}>
                    Пользователь - 
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
