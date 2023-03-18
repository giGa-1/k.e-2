import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"



const initialState = {
    swiperInfo: [
        {id:1,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:2,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:3,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:4,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:5,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:6,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:7,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:8,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:9,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:10,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},

    ],
    gridInfo: [
        {id:1,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:2,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:3,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:4,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:5,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:6,title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', img: '/img/test-news.png', href: '123435'},
        {id:7,descr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing eli Lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit, lorem ipsum dolor sit amet, consectetur adipiscing elit', img: '/img/test-news.png', href: '123435'},
    ]
}


export const focusCompReducer = createSlice({
    name: 'Focus Comp',
    initialState,
    reducers: {


        setSwiperInfoFocus(state, action) {
            return {...state, swiperInfo: [...action.payload]}
        },
        setGridInfoFocus(state, action) {
            return {...state, gridInfo: [...action.payload]}
        },
        extraReducer: {
            [HYDRATE]: (state,action) => {
                return {
                    ...state,
                    ...action.payload
                }
            }
        }
    }
})



export const { setSwiperInfoFocus,setGridInfoFocus } = focusCompReducer.actions;
export const allAboutState = (state)=>state.focusCompReducer;
export default focusCompReducer.reducer;