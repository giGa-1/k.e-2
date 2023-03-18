import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const initialState = [
    {idColumn:1, list: [

        {idCell:1, title: 'Фильмы',href:'/movies', listRows: [
            {id:1, text: 'Лучшие фильмы', href: '/movies?filterRating=1'},
            {id:2, text: 'Новинки кино', href: '/movies?filterTime=1'},
            {id:3, text: 'Страшнейшие картины', href: '/movies?filterGenre=horror'},
            {id:4, text: 'Комедийная минутка', href: '/movies?filterGenre=comedy'},
            {id:5, text: 'Романтические драмы', href: '/movies?filterGenre=drama'},
            {id:6, text: 'Фильмы для всей семьи', href: '/movies?filterGenre=adventure'},
            {id:6, text: 'Захватывающие фентези', href: '/movies?filterGenre=fantasy'},
        ]},
        {idCell:2, title: 'Сериалы',href:'/serials', listRows: [
            {id:1, text: 'Лучшие сериалы', href: '/serials?filterRating=1'},
            {id:2, text: 'Недавние премьеры', href: '/serials?filterTime=1'},
            {id:3, text: 'Жуткие сериалы', href: '/serials?filterGenre=horror'},
            {id:4, text: 'Самые актуальные', href: '/serials?filterReviews=1'},
            {id:5, text: 'Сериалы на все времена', href: '/serials?filterRating=1&filterDate=1990_2010'},
            {id:6, text: 'Заставят посмеятся', href: '/serials?filterGenre=comedy'},
            {id:6, text: 'Фантастика', href: '/serials?filterGenre=fantasy'},
        ]},
    ]},
    {idColumn:2, list: [
        {idCell:1, title: 'Премьеры', href:'/premier', listRows: [
            {id:1, text: 'Самые долгождаемые', href: '/premier?premierFilter=BEST_PREMIER'},
            {id:2, text: 'Непредсказуемые картины', href: '/premier?premierFilter=UNPREDICTABLE_PREMIER'},
            {id:3, text: 'Эпохальные продолжения', href: '/premier?premierFilter=CONTINUE_PREMIER'},
        ]},
        {idCell:2, title: 'Новости', href:'/news', listRows: [
            {id:1, text: 'Что нового в мире кино?', href: '/news'},
            {id:2, text: 'Эпотажные актеры', href: '/news?newsFilter=ACTORS_NEWS'},
            {id:3, text: 'События недели', href: '/news?newsFilter=WEEK_NEWS'},
            {id:4, text: 'Рекорды месяца', href: '/news?newsFilter=MONTH_NEWS'},
        ]},
      
    ]},
]
export const footerInfoReducer = createSlice({
    name: 'Footer Info',
    initialState,
    reducers: {
        // extra reducer
        extraReducers: {
            [HYDRATE]: (state, action) => {
                return {
                    ...state,
                    ...action.payload
                }
            }
        }
    }
})

export const {} = footerInfoReducer.actions;
export const heroState = (state)=>state.footerInfoReducer;
export default footerInfoReducer.reducer;