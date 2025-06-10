import { createSlice } from "@reduxjs/toolkit";
const initialState={
    videoarr:[]
}
const videomanager=createSlice({
    name:"videomanager",
    initialState,
    reducers:{
        addallvideos:(state,action)=>{
            state.videoarr=action.payload
        },
        removeallvideos:(state)=>{
            state.videoarr=[]
        },
        addvideo:(state,action)=>{
            state.videoarr.push(action.payload)
        },
        removevideo:(state,action)=>{
            state.videoarr=state.videoarr.filter(video=>video.$id!==action.payload)
        },
        updatevideo:(state,action)=>{
            state.videoarr=state.videoarr.map(video=>video.$id===action.payload.$id?action.payload:video)
        }
    }
})
export const{addallvideos,addvideo,removeallvideos,removevideo,updatevideo}=postmanager.actions;
export default videomanager.reducer;