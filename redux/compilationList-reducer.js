import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"


const initialState = [
    {id:1,nameTop:'Топ 100 Лучших Фильмов',list:[], fetch:'search?minYear=1980&maxYear=2023&minRating=0&minVotes=200000&name=&type=movie&genre=&country=&sort=rating&page=1'},
    {id:2,nameTop:'Топ 25 Лучших Сериалов',list:[],fetch:'search?minYear=1980&maxYear=2023&minRating=0&minVotes=150000&name=&type=tv-series&genre=&country=&sort=rating&page=1' },
    {id:3,nameTop:'Топ 30 Страшнейших Ужасов',list:[], fetch:'search?minYear=1985&maxYear=2023&minRating=0&minVotes=70000&name=&type=movie&genre=ужасы&country=&sort=rating&page=1'},
    {id:4,nameTop:'Топ 40 Мультфильмов',list:[], fetch: 'search?minYear=1980&maxYear=2023&minRating=0&minVotes=100000&name=&type=movie&genre=&country=&sort=rating&page=1'},
    {id:5,nameTop:'Топ 35 Комедийных картин',list:[],  fetch: 'search?minYear=1980&maxYear=2023&minRating=0&minVotes=100000&name=&type=movie&genre=комедия&country=&sort=rating&page=1'},
    {id:6,nameTop:'Топ 20 Фантастических фильмов',list:[],  fetch: 'search?minYear=1995&maxYear=2023&minRating=0&minVotes=125000&name=&type=movie&genre=фантастика&country=&sort=rating&page=1'},
   
]


export const compilListPageReducer = createSlice({
    name: 'Compilation List Page',
    initialState,
    reducers: {
        setCompilListPage(state,action) {
            return state.map((e,i)=>e.id===action.payload.id ? {...e, list: action.payload.list } : {...e})
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