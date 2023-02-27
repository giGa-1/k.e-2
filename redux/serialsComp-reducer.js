import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const initialState = {
    officialState: []
}
export const serialsCompReducer = createSlice({
    name: 'Serials Comp',
    initialState,
    reducers: {
        setStateOfficialSerialsComp(state,action) {
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

export const {setStateOfficialSerialsComp} = serialsCompReducer.actions;
export const heroState = (state)=>state.serialsCompReducer;
export default serialsCompReducer.reducer;