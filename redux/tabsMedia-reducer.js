import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const initialState = [
    {id:1,title:'Все материалы', active:true},
    {id:2,title:'Новости', active:false},
    {id:3,title:'Видео', active:false},
    {id:4,title:'Статьи', active:false},

]
export const tabsMediaReducer = createSlice({
    name: 'Tabs Media',
    initialState,
    reducers: {
        setTabsMediaActive(state,action) {
            return state.map(e=>e.id==action.payload.id?{...e,active:true}:{...e,active:false})
        },

        // extra reducer
        extraReducers: {
            [HYDRATE]: (state, action) => {
                return {
                    ...state,
                    ...action.payload
                }
            }
        }
    }
})

export const {setTabsMediaActive} = tabsMediaReducer.actions;
export const tabsMediaState = (state)=>state.tabsMediaReducer;
export default tabsMediaReducer.reducer;