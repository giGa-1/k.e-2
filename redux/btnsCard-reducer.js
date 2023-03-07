import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"


const initialState = [
    {id:1,title:'О фильме',cardId:'about', active: true},
    {id:2,title:'Отзывы',cardId:'reviews', active: false},
    {id:3,title:'Актеры',cardId:'actors', active: false},
    {id:4,title:'Медиа',cardId:'media', active: false},

]


export const btnsCardReducer = createSlice({
    name: 'Tabs btns card',
    initialState,
    reducers: {
        setActiveBtnsTabs(state,action) {
            console.log(action)
            return state.map((e)=>e.id==action.payload.id? {...e, active:true} : {...e, active: false})
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


export const {setActiveBtnsTabs} = btnsCardReducer.actions;
export const allAboutState = (state)=>state.btnsCardReducer;
export default btnsCardReducer.reducer;