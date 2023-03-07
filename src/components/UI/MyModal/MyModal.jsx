import React from 'react'
import cl from './MyModal.module.css';

export default function MyModal({children, setIsModal, isModal}) {
  return (
    <div className={isModal ? [cl.block, cl.active].join` ` :cl.block} onClick={e=>setIsModal(false)}>
        <div className={cl.content}>
            <div className={cl.modal} onClick={e=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    </div>
  )
}
