// 切片  即存储在store中的一片一片的数据(数据+操作数据的方法)  比如说，它可以是单个人的数据  也可以是一个类型的数据

import { createSlice } from '@reduxjs/toolkit' // 引入createSlice方法  切片

//创建一个切片
export const counterSlice = createSlice({
    // 该切片的名字
    name: 'ws_userdatas',
    //在创建实例时给定state 即vuex中的state数据
    initialState: {
        userdatas: []
    },
    // 操作数据的方法 相当于vuex中的mutations、actions
    reducers: {
        // 添加到 userdatas 中
        adduser: (state: any, newuser:any) => {
            state.userdatas.push(newuser)
        },
        deluser: (state: any, newuser: any) => {
            state.userdatas = state.userdatas.filter((item: any) => {
                return item.username === newuser.username
            })
        },
    },
})

// 为每个 reducer 函数生成动作创建器（Action creators），action是就相当于是一个指令，根据这个指令，来进行相应的操作
//这里export的方法是为了给counter组件，而不是给redux或store
export const { adduser, deluser } = counterSlice.actions

//export给store
export default counterSlice.reducer
