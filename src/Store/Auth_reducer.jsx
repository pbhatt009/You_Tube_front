import {createSlice} from '@reduxjs/toolkit';
const initialState={
    status:false,
    userdata:null,
}
const authslice=createSlice({
   name:"auth",
   initialState,
   reducers:{
      login:(state,action)=>{
        state.status=true
       
        state.userdata=action.payload
          
        
      },
      
      logout:(state)=>{
     
        state.status=false
        state.userdata=null
      },
      changestatus:(state)=>{
        state.status=!state.status
      }
   }



})
export const {login,logout,changestatus}=authslice.actions;
export default authslice.reducer;