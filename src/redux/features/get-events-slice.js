import { createSlice } from "@reduxjs/toolkit"
import getd from '../../UtilitiesFunctions/getData'
const initialState = {
    eventsData:[],
    isLoading:false,
}
const Url ='http://localhost:1337/api/events';
export const setEventsSlice = createSlice({
    name:'eventsData',
    initialState,
    reducers:{
        setEvents: (state,action)=>{
            console.log(action.payload)
                           state.eventsData = action.payload;

            }
            ,
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        }
    
})

export const { setEvents, setLoading } = setEventsSlice.actions;

export const initializeEvents = () => {
    return async (dispatch) => {
        dispatch(setLoading(true));
      const events = await getd.getAll(Url);
      dispatch(setEvents(events));
      dispatch(setLoading(false))
  
    };
  };
  

  export default setEventsSlice.reducer;