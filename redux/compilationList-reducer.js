import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"


const initialState = {
    nameCompilation: '',
    stateCompilation: []
}


export const compilListPageReducer = createSlice({
    name: 'Compilation List Page',
    initialState,
    reducers: {
        setCompilListPage(state,action) {
            return {...state,stateCompilation:[...action.payload]}
        },

    
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


export const { setCompilListPage } = compilListPageReducer.actions;
export const compilationListState = (state)=>state.compilListPageReducer;
export default compilListPageReducer.reducer;