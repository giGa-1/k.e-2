import React, {useEffect, useState, useMemo} from 'react';
import ReactPlayer from 'react-player/lazy'
import cl from './MediaComp.module.css';
import { useInView } from 'react-intersection-observer';

export default function MediaVideoItem({url = 'https://www.youtube.com/watch?v=JqcncLPi9zw'}) {
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: .2,
      });
  return (
    <li ref={ref} className={inView ? [cl.videosAllItem, cl.videosAllItemActive].join` ` : cl.videosAllItem}>
        <ReactPlayer volume={.5} controls={true} url={url}  style={{maxWidth: '310px', width:'100% !important', maxHeight: '200px', border: ' 1px solid #333', boxShadow: ' rgba(100, 100, 111, 0.15) 0px 7px 29px 0px', borderRadius: '15px', overflow: 'hidden'}}>
        </ReactPlayer>
    </li>
  )
}
