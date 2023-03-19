import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"


const initialState = {
    date: '',
    dateText: '',
    premierMovies: [
        
    ]
}

export const calendarCompReducer = createSlice({
    name: 'Calendar Comp',
    initialState,
    reducers: {
       setDateCalendar(state,action) {
        return {...state, date: action.payload}
       },
       setDateTextCalendar(state,action) {
        return {...state, dateText: action.payload}
       },
       setPremierMoviesCalendar(state,action) {
        return {...state, premierMovies: action.payload}
       },
        extraReducer: {
            [HYDRATE]: (state,action) => {
                return {
                    ...state,
                    ...action.payload
                }
            }
        },
    }
})


export const {setDateCalendar, setDateTextCalendar, setPremierMoviesCalendar} = calendarCompReducer.actions;
export const calendatCompState = (state)=>state.calendarCompReducer;
export default calendarCompReducer.reducer;