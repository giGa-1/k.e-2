import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"


const initialState = {
    isAnimation: false,
    isSign: false,
}

export const authAnimationReducer = createSlice({
    name: 'Auth Animation',
    initialState,
    reducers: {

        setIsAnimation(state,action) {
            return  {...state, isAnimation: action.payload}
        },
        setIsSign(state,action) {
            return  {...state, isSign: action.payload}
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


export const { setIsAnimation, setIsSign } = authAnimationReducer.actions;
export const authAnimationState = (state)=>state.authAnimationReducer;
export default authAnimationReducer.reducer;