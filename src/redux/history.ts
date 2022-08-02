import { createSlice } from "@reduxjs/toolkit";


const historySlice = createSlice({
    name: "history",

    initialState: {
        content: [] as any
    },
    //纯函数
    reducers: {
        setContent(state, action) {
            state.content.push(action.payload)
        },
        delContent(state,action){
            state.content = []
        }

    }
})

export const { setContent,delContent } = historySlice.actions;

export default historySlice;