import { createSlice } from "@reduxjs/toolkit";


export const worldSlice = createSlice({
    name: 'worlds',
    //在创建实例时给定state
    initialState: {
        worldSliceDatas:[]
    },
    reducers: {
        addworldData:(state:any,detaildatas:any)=>{
            state.worldSliceDatas.push(detaildatas)
        },
    },
})
export const { addworldData} = worldSlice.actions
export default worldSlice.reducer