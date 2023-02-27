import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const initialState = {
    unofficialState: [],
    officialState: [],
}
export const heroReducer = createSlice({
    name: 'Hero',
    initialState,
    reducers: {
        setStateUnofficialHero(state,action) {
            return {...state,unofficialState:[...action.payload]}
        },
        setStateOfficialHero(state,action) {
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

export const {setStateUnofficialHero, setStateOfficialHero} = heroReducer.actions;
export const heroState = (state)=>state.heroReducer;
export default heroReducer.reducer;