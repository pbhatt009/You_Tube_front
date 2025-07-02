import { createSlice } from "@reduxjs/toolkit";
const initialState={
    videoarr:[],
    minevideoarr:[]
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
        addallmyvideo:(state,action)=>{
           state.minevideoarr=action.payload
        },
        removeallmyvideo:(state)=>{
           state.minevideoarr=[]
        },
        addvideo:(state,action)=>{
            state.videoarr.push(action.payload)
            state.minevideoarr.push(action.payload)
        },
        removevideo:(state,action)=>{
            state.videoarr=state.videoarr.filter(video=>video.$id!==action.payload)
            state.minevideoarr=state.minevideoarr.filter(video=>video.$id!==action.payload)
        },
        updatevideo:(state,action)=>{
            state.videoarr=state.videoarr.map(video=>video.$id===action.payload.$id?action.payload:video)
            state.minevideoarr=state.minevideoarr.map(video=>video.$id===action.payload.$id?action.payload:video)
        }
    }
})
export const{addallvideos,addvideo,removeallvideos,removevideo,updatevideo,addallmyvideo,removeallmyvideo}=videomanager.actions;
export default videomanager.reducer;