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
import {complilationCompReducer} from './compilationComp-reducer';
import {monthsReducer} from './months-reducer';
import {footerInfoReducer} from './footerInfo-reducer';
import {moviePage} from './moviePage-reducer';
import {btnsCardReducer} from './btnsCard-reducer';
import {FilterCountriesReducer} from './filterCountries-reducer';
import {FilterGenresReducer} from './filterGenres-reducer';
import {FilterYearsReducer} from './filterYears-reducer';
import {moviePageReducer} from './pageMovie-reducer';
import {favStateReducer} from './favState-reducer';
import {ActorStateReducer} from './ActorState-reducer';
import {complilationPageReducer} from './compilationPage-reducer';
import {compilListPageReducer} from './compilationList-reducer';
import {tabsMediaReducer} from './tabsMedia-reducer';
import {calendarCompReducer} from './calendarComp-reducer';
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
        [complilationCompReducer.name]: complilationCompReducer.reducer,
        [monthsReducer.name]: monthsReducer.reducer,
        [footerInfoReducer.name]: footerInfoReducer.reducer,
        [moviePage.name]: moviePage.reducer,
        [btnsCardReducer.name]: btnsCardReducer.reducer,
        [FilterCountriesReducer.name]: FilterCountriesReducer.reducer,
        [FilterGenresReducer.name]:FilterGenresReducer.reducer,
        [FilterYearsReducer.name]: FilterYearsReducer.reducer,
        [moviePageReducer.name]:moviePageReducer.reducer,
        [favStateReducer.name]:favStateReducer.reducer,
        [ActorStateReducer.name]:ActorStateReducer.reducer,
        [complilationPageReducer.name]:complilationPageReducer.reducer,
        [compilListPageReducer.name]:compilListPageReducer.reducer,
        [tabsMediaReducer.name]:tabsMediaReducer.reducer,
        [calendarCompReducer.name]:calendarCompReducer.reducer,
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