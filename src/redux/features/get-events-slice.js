import { createSlice } from "@reduxjs/toolkit"
import getd from '../../UtilitiesFunctions/getData'
const initialState = {
    eventsData:[],
    isLoading:false,
}

export const setEventsSlice = createSlice({
    name:'eventsData',
    initialState,
    reducers:{
        setEvents: (state,action)=>{
                           state.eventsData = action.payload;

            }
            ,
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        }
    
})

export const { setEvents, setLoading } = setEventsSlice.actions;

export const initializeEvents = (url) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
      const events = await getd.getAll(url);
      dispatch(setEvents(events));
      dispatch(setLoading(false))
  
    };
  };
  
 
  export default setEventsSlice.reducer;