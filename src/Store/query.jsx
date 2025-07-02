import {createSlice} from '@reduxjs/toolkit';
const initialState={
    query:""
    
}
const querySlice=createSlice({
   name:"query",
   initialState,
   reducers:{
      changequery:(state,action)=>{
        state.query=action.payload
      }
      
    
   }



})
export const {changequery}=querySlice.actions;
export default querySlice.reducer;