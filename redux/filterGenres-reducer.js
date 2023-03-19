import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"


const initialState =[
    {
        id:1,
        active:true,
          text: "Все жанры",
        slug: ""
      },
    {
      id:2,
      active:false,
        text: "Аниме",
      slug: "аниме"
    },
    {
      id:3,
      active:false,
        text: "Биография",
      slug: "биография"
    },
    {
      id:4,
      active:false,
        text: "Боевик",
      slug: "боевик"
    },
    {
      id:5,
      active:false,
        text: "Вестерн",
      slug: "вестерн"
    },
    {
      id:6,
      active:false,
        text: "Военный",
      slug: "военный"
    },
    {
      id:7,
      active:false,
        text: "Детектив",
      slug: "детектив"
    },
 
    {
      id:10,
      active:false,
        text: "Документальный",
      slug: "документальный"
    },
    {
      id:11,
      active:false,
        text: "Драма",
      slug: "драма"
    },
   
    {
      id:14,
      active:false,
        text: "Комедия",
      slug: "комедия"
    },
   
   
    {
      id:17,
      active:false,
        text: "Криминал",
      slug: "криминал"
    },
    {
      id:18,
      active:false,
        text: "Мелодрама",
      slug: "мелодрама"
    },
  
    {
      id:20,
      active:false,
        text: "Мультфильм",
      slug: "мультфильм"
    },
   
  
    {
      id:23,
      active:false,
        text: "Приключения",
      slug: "приключения"
    },
  
  
    {
      id:28,
      active:false,
        text: "Триллер",
      slug: "триллер"
    },
    {
      id:29,
      active:false,
        text: "Ужасы",
      slug: "ужасы"
    },
    {
      id:30,
      active:false,
        text: "Фантастика",
      slug: "фантастика"
    },
    {
      id:31,
      active:false,
        text: "Нуар",
      slug: "нуар"
    },
    {
      id:32,
      active:false,
        text: "Фэнтези",
      slug: "фэнтези"
    },
   
  ]

export const FilterGenresReducer = createSlice({
    name: 'Filter Genres',
    initialState,
    reducers: {
        setFilterGenres(state, action) {
            return state.map(e=>e.id==action.payload.id ? {...e, active: true} : {...e, active: false})
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

export const {setFilterGenres} = FilterGenresReducer.actions;

export const filterGenresState = (state)=>state.FilterGenresReducer;
export default FilterGenresReducer.reducer