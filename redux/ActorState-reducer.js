
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";




const initialState = {
    idSearch: 0,
    infoObj: {
        
    }
}

// Actual Slice
export const ActorStateReducer = createSlice({
  name: "Actor State",
  initialState,
  reducers: {

    setInfoActorState (state, action) {
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


export const {setInfoActorState } = ActorStateReducer.actions;

export const ActorReducerState = (state) => state.ActorStateReducer;
export default ActorStateReducer.reducer;