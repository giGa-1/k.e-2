import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const initialState = {
    films: [
        
    ],
    serials: [

    ],
    persons: [

    ],
    news: [

    ]
}
export const mainContentReducer = createSlice({
    name: 'Content Main',
    initialState,
    reducers: {
        setMainContentFilms (state, action) {
            return {...state, films: action.payload}
        },
        setMainContentSerials (state, action) {
            return {...state, serials: action.payload}
        },
        setMainContentPersons (state, action) {
            return {...state, persons: action.payload}
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

export const {setMainContentFilms,setMainContentSerials,setMainContentPersons} = mainContentReducer.actions;
export const mainContentState = (state)=>state.mainContentReducer;
export default mainContentReducer.reducer;