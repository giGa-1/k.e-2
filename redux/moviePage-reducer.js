import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";




const initialState = {
    idSearch: 0,
    infoObj: {
        
    }
}

// Actual Slice
export const moviePage = createSlice({
  name: "Movie Page",
  initialState,
  reducers: {

    setInfoMoviePage (state, action) {
        return {...state, infoObj: action.payload}
    },
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


export const {setInfoMoviePage } = moviePage.actions;

export const moviePageState = (state) => state.moviePage;
export default moviePage.reducer;