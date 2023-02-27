import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper";
import {heroReducer} from './hero-raducer';
import {allAboutReducer} from './allAbout-reducer';
import {authAnimationReducer} from './authActive-reducer';
import {mainContentReducer} from './mainContent-reducer';
import {focusCompReducer} from './focusComp-reduder';
import {newsCompReducer} from './NewsComp-reducer';
import {serialsCompReducer} from './serialsComp-reducer';
import {moviesCompReducer} from './moviesComp-reducer';







const makeStore = () => configureStore({
    reducer: {
        [heroReducer.name]: heroReducer.reducer,
        [allAboutReducer.name]: allAboutReducer.reducer,
        [authAnimationReducer.name]: authAnimationReducer.reducer,
        [mainContentReducer.name]: mainContentReducer.reducer,
        [focusCompReducer.name]: focusCompReducer.reducer,
        [newsCompReducer.name]: newsCompReducer.reducer,
        [serialsCompReducer.name]: serialsCompReducer.reducer,
        [moviesCompReducer.name]: moviesCompReducer.reducer,




    },
    devTools: true
})

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore['getState']>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType, 
    AppState,
    unknown,
    Action
>

export const wrapper = createWrapper<AppStore>(makeStore);