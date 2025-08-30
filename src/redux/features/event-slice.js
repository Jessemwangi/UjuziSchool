import {createSlice} from '@reduxjs/toolkit';

export const eventSlice = createSlice({
    name:'event',
    initialState:{
        categories: [],
        dateFilters: [],
        cities: []
    },
    reducers:{
        add_category:(state,{payload}) => {
            if(payload.changeType === 'remove'){
                state.categories = state.categories.filter((category) => category !== payload.item)
            }
            else if(payload.changeType === 'added'){
                state.categories.push(payload.item)
            }
        },
        add_date_filter:(state,{payload}) => {
            if(payload.changeType === 'remove'){
                state.dateFilters = state.dateFilters.filter((filter) => filter !== payload.item)
            }
            else if(payload.changeType === 'added'){
                // Remove other date filters first (only one date filter at a time)
                state.dateFilters = [payload.item];
            }
        },
        add_city:(state,{payload}) => {
            if(payload.changeType === 'remove'){
                state.cities = state.cities.filter((city) => city !== payload.item)
            }
            else if(payload.changeType === 'added'){
                state.cities.push(payload.item)
            }
        }
    }
})

export const {add_category, add_date_filter, add_city} = eventSlice.actions;
export default eventSlice.reducer;