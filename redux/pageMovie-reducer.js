import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const initialState =  []
export const moviePageReducer = createSlice({
    name: 'Movies Page',
    initialState,
    reducers: {
        setStateMoviePage(state,action) {
            console.log(action)
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

export const {setStateMoviePage} = moviePageReducer.actions;
export const moviePageState = (state)=>state.moviePageReducer;
export default moviePageReducer.reducer;