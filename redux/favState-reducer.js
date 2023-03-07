import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"


const initialState = [
    // {id:1,infoObj:''},
]


export const favStateReducer = createSlice({
    name: 'Fav State',
    initialState,
    reducers: {

        setFavNewItems(state, action) {
            return [...state,{id:action.payload.id,infoObj:action.payload}]
        },
        deleteFavItems(state, action) {
            return state.filter((e,i)=>e.id!=action.payload.id)
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

export const {setFavNewItems,deleteFavItems} = favStateReducer.actions;
export const favReducerState = (state)=>state.favStateReducer;
export default favStateReducer.reducer