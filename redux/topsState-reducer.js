import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const initialState = [
    
]
export const topsStateReducecr = createSlice({
    name: 'Tops state',
    initialState,
    reducers: {
        setStateTops (state, action) {
            return action.payload
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

export const {setStateTops} = topsStateReducecr.actions;
export const topsState = (state)=>state.topsStateReducecr;
export default topsStateReducecr.reducer;