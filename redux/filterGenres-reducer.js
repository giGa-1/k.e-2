import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"


const initialState =[
    {
        id: 0,
        text: "Все жанры",
        active: true,
    },
    {
        id: 1,
        text: "Аниме",
        active: false,
    },
    {
        id: 2,
        text: "Биографии",
        active: false,
    },
    {
        id: 3,
        text: "Боевики",
        active: false,
    },
    {
        id: 4,
        text: "Вестерны",
        active: false,
    },
    {
        id: 5,
        text: "Военные",
        active: false,
    },
    {
        id: 6,
        text: "Детективы",
        active: false,
    },
    {
        id: 7,
        text: "Детские",
        active: false,
    },
    {
        id: 8,
        text: "Документальные",
        active: false,
    },
    {
        id: 9,
        text: "Драмы",
        active: false,
    },
    {
        id: 10,
        text: "Игры",
        active: false,
    },
    {
        id: 11,
        text: "Исторические",
        active: false,
    },
    {
        id: 12,
        text: "Комедии",
        active: false,
    },
    {
        id: 13,
        text: "Концерты",
        active: false,
    },
    {
        id: 14,
        text: "Короткометражки",
        active: false,
    },
    {
        id: 15,
        text: "Криминал",
        active: false,
    },
    {
        id: 16,
        text: "Мелодрамы",
        active: false,
    },
    {
        id: 17,
        text: "Музыкальные",
        active: false,
    },
    {
        id: 18,
        text: "Мультфильмы",
        active: false,
    },
    {
        id: 19,
        text: "Мюзиклы",
        active: false,
    },
    {
        id: 20,
        text: "Новости",
        active: false,
    },
    {
        id: 21,
        text: "Приключения",
        active: false,
    },
    {
        id: 22,
        text: "Реальное ТВ",
        active: false,
    },
    {
        id: 23,
        text: "Семейные",
        active: false,
    },
    {
        id: 24,
        text: "Спортивные",
        active: false,
    },
    {
        id: 25,
        text: "Ток-шоу",
        active: false,
    },
    {
        id: 26,
        text: "Триллеры",
        active: false,
    },
    {
        id: 27,
        text: "Ужасы",
        active: false,
    },
    {
        id: 28,
        text: "Фантастика",
        active: false,
    },
    {
        id: 29,
        text: "Фильмы-нуар",
        active: false,
    },
    {
        id: 30,
        text: "Фэнтези",
        active: false,
    },
    {
        id: 31,
        text: "Церемонии"
    }
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