import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"

const initialState = [
    {idColumn:1, list: [
        {idCell:1, title: 'Фильмы', listRows: [
            {id:1, text: 'Лучшие фильмы'},
            {id:2, text: 'Новинки кино'},
            {id:3, text: 'Страшнейшие картины'},
            {id:4, text: 'Комедийная минутка'},
            {id:5, text: 'Романтические драмы'},
            {id:6, text: 'Фильмы для всей семьи'},
            {id:6, text: 'Захватывающие фентези'},
        ]},
        {idCell:2, title: 'Сериалы', listRows: [
            {id:1, text: 'Лучшие сериалы'},
            {id:2, text: 'Недавние премьеры'},
            {id:3, text: 'Жуткие сериалы'},
            {id:4, text: 'Самые актуальные'},
            {id:5, text: 'Сериалы на все времена'},
            {id:6, text: 'Семейные ситкомы'},
            {id:6, text: 'Фантастика'},
        ]},
    ]},
    {idColumn:2, list: [
        {idCell:1, title: 'Премьеры', listRows: [
            {id:1, text: 'Самые долгождаемые'},
            {id:2, text: 'Непредсказуемые картины'},
            {id:3, text: 'Эпохальные продолжения'},
            {id:4, text: 'Специфические новинки'},
        ]},
        {idCell:2, title: 'Новости', listRows: [
            {id:1, text: 'Что нового в мире кино?'},
            {id:2, text: 'Эпотажные актеры'},
            {id:3, text: 'События недели'},
            {id:4, text: 'Рекорды месяца'},
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