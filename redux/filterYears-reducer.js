import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"


const initialState = [
    {
        id: 0,
        text: "Все годы",
        slug: ['2005','2023'],
        active: true,
    },
    {
        id: 1,
        text: "2026",
                slug:['2026','2026'],
        active: false,
    },
    {
        id: 2,
        text: "2025",
        slug:['2025','2025'],
        active: false,
    },
    {
        id: 3,
        text: "2024",
        slug:['2024','2024'],
        active: false,
    },
    {
        id: 4,
        text: "2023",
        slug:['2023','2023'],
        active: false,
    },
    {
        id: 5,
        text: "2022",
        slug:['2022','2022'],
        active: false,
    },
    {
        id: 6,
        text: "2021",
        slug:['2021','2021'],
        active: false,
    },
    {
        id: 7,
        text: "2020",
        slug:['2020','2020'],
        active: false,
    },
    {
        id: 8,
        text: "2019",
        slug:['2019','2019'],
        active: false,
    },
    {
        id: 9,
        text: "2018",
        slug:['2018','2018'],
        active: false,
    },
    {
        id: 40,
        text: "2017",
        slug:['2017','2017'],
        active: false,
    },
    {
        id: 50,
        text: "2016",
        slug:['2016','2016'],
        active: false,
    },
    {
        id: 51,
        text: "2015",
        slug:['2015','2015'],
        active: false,
    },
    {
        id: 10,
        text: "2020-2026",
        slug:['2020','2026'],
        active: false,
    },
    {
        id: 11,
        text: "2010-2019",
        slug:['2010','2019'],
        active: false,
    },
    {
        id: 12,
        text: "2000-2009",
        slug:['2000','2009'],
        active: false,
    },
    {
        id: 13,
        text: "1990-1999",
        slug:['1990','1999'],
        active: false,
    },
    {
        id: 14,
        text: "1980-1989",
        slug:['1980','1989'],
        active: false,
    },
    {
        id: 15,
        text: "1970-1979",
        slug:['1970','1979'],
        active: false,
    },
   
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