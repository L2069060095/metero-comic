import { createSlice } from "@reduxjs/toolkit";


const sortSlice = createSlice({
    name: "history",

    initialState: {
        tag: 0,
        sort: 1,
        update_status: 0
    },
    //纯函数
    reducers: {
        setTag(state, action) {
            state.tag = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        setUpdate_status(state, action) {
            state.update_status = action.payload
        },

    }
})

export const { setTag, setSort, setUpdate_status } = sortSlice.actions;

export default sortSlice;