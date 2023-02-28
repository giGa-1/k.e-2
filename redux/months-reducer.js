import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";




const initialState =["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

// Actual Slice
export const monthsReducer = createSlice({
  name: "Months",
  initialState,
  reducers: {

  
    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      },
    },

  },
});



export const monthsReducerState = (state) => state.monthsReducer;
export default monthsReducer.reducer;