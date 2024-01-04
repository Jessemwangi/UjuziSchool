import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import courseSlice  from './features/course-slice';
// import cartSlice from './features/cart-slice';
// import wishlistSlice from './features/wishlist-slice';
import eventSlice from './features/event-slice';
// import filterSlice from './features/filter-slice';
// import authSlice from './features/auth-slice';
// import  lessonSlice  from './features/lessons-slice';
// import loginSlice from './features/loginSlice';
import setEventsSlice  from './features/get-events-slice';

const rootReducer = combineReducers({
    // auth:authSlice,
    // courses:courseSlice,
    // cart:cartSlice,
    // wishlist:wishlistSlice,
    event:eventSlice,
    // filter:filterSlice,
    // less:lessonSlice,
    // authLogin:loginSlice,
    setEvents:setEventsSlice,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false
    })
})