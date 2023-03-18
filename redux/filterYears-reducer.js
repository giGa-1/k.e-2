import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"


const initialState = [
    {
        id: 0,
        text: "Все годы",
        active: true,
    },
    {
        id: 1,
        text: "2026",
        active: false,
    },
    {
        id: 2,
        text: "2025",
        active: false,
    },
    {
        id: 3,
        text: "2024",
        active: false,
    },
    {
        id: 4,
        text: "2023",
        active: false,
    },
    {
        id: 5,
        text: "2022",
        active: false,
    },
    {
        id: 6,
        text: "2021",
        active: false,
    },
    {
        id: 7,
        text: "2020",
        active: false,
    },
    {
        id: 8,
        text: "2019",
        active: false,
    },
    {
        id: 9,
        text: "2018",
        active: false,
    },
    {
        id: 10,
        text: "2020-2026",
        active: false,
    },
    {
        id: 11,
        text: "2010-2019",
        active: false,
    },
    {
        id: 12,
        text: "2000-2009",
        active: false,
    },
    {
        id: 13,
        text: "1990-1999",
        active: false,
    },
    {
        id: 14,
        text: "1980-1989",
        active: false,
    },
    {
        id: 15,
        text: "1970-1979",
        active: false,
    },
    {
        id: 16,
        text: "1960-1969",
        active: false,
    },
    {
        id: 17,
        text: "1950-1959",
        active: false,
    },
    {
        id: 18,
        text: "1940-1949",
        active: false,
    },
    {
        id: 19,
        text: "1930-1939",
        active: false,
    },
    {
        id: 20,
        text: "1920-1929",
        active: false,
    },
    {
        id: 21,
        text: "1910-1919",
        active: false,
    },
    {
        id: 22,
        text: "1900-1909",
        active: false,
    },
    {
        id: 23,
        text: "1890-1899",
        active: false,
    }
]

export const FilterYearsReducer = createSlice({
    name: 'Filter Years',
    initialState,
    reducers: {

        setFilterYears(state, action) {
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

export const {setFilterYears} = FilterYearsReducer.actions;

export const filterYearsState = (state)=>state.FilterYearsReducer;
export default FilterYearsReducer.reducer