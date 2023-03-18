import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"


const initialState = { 
    videoContent: [],
    actorsContent: [],
}


export const favStateReducer = createSlice({
    name: 'Fav State',
    initialState,
    reducers: {

        setFavNewItems(state, action) {
            return {...state, videoContent: [...state.videoContent,{id:action.payload.id,infoObj:action.payload}]}
        },
        deleteFavItems(state, action) {
            return state.videoContent.filter((e,i)=>e.id!=action.payload.id)
        },
        setFavNewActors(state, action) {
            return {...state, actorsContent: [...state.videoContent,{id:action.payload.id,infoObj:action.payload}]}
        },
        deleteFavActors(state, action) {
            return state.actorsContent.filter((e,i)=>e.id!=action.payload.id)
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

export const {setFavNewItems,deleteFavItems, setFavNewActors, deleteFavActors} = favStateReducer.actions;
export const favReducerState = (state)=>state.favStateReducer;
export default favStateReducer.reducer