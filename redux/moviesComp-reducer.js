import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const initialState = {
    officialState: [],
}
export const moviesCompReducer = createSlice({
    name: 'Movies Comp',
    initialState,
    reducers: {
        setStateOfficialMoviesComp(state,action) {
            return {...state,officialState:[...action.payload]}
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

export const {setStateOfficialMoviesComp} = moviesCompReducer.actions;
export const heroState = (state)=>state.moviesCompReducer;
export default moviesCompReducer.reducer;