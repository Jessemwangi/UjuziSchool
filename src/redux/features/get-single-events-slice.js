import { createSlice } from "@reduxjs/toolkit"
import getd from '../../UtilitiesFunctions/getData'
const initialState = {
    singleEventsData:{},
    isLoading:false,
}

export const setSingleEventsSlice = createSlice({
    name:'singleEventsData',
    initialState,
    reducers:{
        setSingleEvents: (state,action)=>{
            console.log(action.payload)
                           state.singleEventsData = action.payload;

            }
            ,
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        }
    
})

export const { setSingleEvents, setLoading } = setSingleEventsSlice.actions;

export const initializeSingleEvents = (url) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
      const events = await getd.getAll(url);
      dispatch(setSingleEvents(events));
      dispatch(setLoading(false))
  
    };
  };
  
 
  export default setSingleEventsSlice.reducer;