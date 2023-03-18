import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"


const initialState = [
    {id:1,title:'Фильмы',descr:'Популяные и вечная классика', imgName: 'test-AA-item-bi.png', linkHref: '/movies'},
    {id:2,title:'Сериалы',descr:'Свежие и модные', imgName: 'test-AA-item-bi.png',  linkHref: '/serials'},
    {id:3,title:'Премьеры',descr:'Самые ожидаемые', imgName: 'test-AA-item-bi.png',  linkHref: '/premiere'},
    {id:4,title:'Новинки',descr:'Что нового?', imgName: 'test-AA-item-bi.png', linkHref: '/news-movies'},
]


export const allAboutReducer = createSlice({
    name: 'All About',
    initialState,
    reducers: {

        setImgNameAllAbout(state,action) {
            return state.map(e=>e.id == action.payload.id ? {...e, imgName: action.payload.text} : e)
        },
        // extra
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


export const { setImgNameAllAbout } = allAboutReducer.actions;
export const allAboutState = (state)=>state.allAboutReducer;
export default allAboutReducer.reducer;