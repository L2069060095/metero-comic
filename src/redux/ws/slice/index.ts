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
        adduser: (state: any, newuser: any) => {
            state.userdatas.push(newuser)
        },

        // 删除用户
        deluser: (state: any, newuser: any) => {
            state.userdatas = state.userdatas.filter((item: any) => {
                return item.payload.newuser.username === newuser.username
            })
        },

        //添加历史记录
        addhistory: (state: any, newhistory: any) => {
            state.userdatas[0].history = newhistory
        },

        // 删除历史记录
        delhistory: (state: any, delhistory: any) => {
            state.userdatas[0].history.payload.newhistory = state.userdatas[0].history.payload.newhistory.filter((item: any) => {
                return item.id === delhistory.id
            })
        },

        // 添加收藏
        addCollection: (state: any, newcollection: any) => {
            state.userdatas[0].collection = newcollection
        },

        // 删除收藏
        delCollection: (state: any, caricatureId: any) => {
            state.userdatas[0].collection.payload.newcollection = state.userdatas[0].collection.payload.newcollection.filter((item: any) => {
                return item.id === caricatureId.id
            })
        },

        // 添加漫画
        addCaricature: (state: any, newcaricature: any) => {
            state.userdatas[0].caricature = newcaricature
        },

        // 删除漫画
        delCaricature: (state: any, caricatureId: any) => {
            state.userdatas[0].caricature.payload.newcaricature = state.userdatas[0].caricature.payload.newcaricature.filter((item: any) => {
                return item.id === caricatureId.id
            })
        },
    },
})

// 为每个 reducer 函数生成动作创建器（Action creators），action是就相当于是一个指令，根据这个指令，来进行相应的操作
//这里export的方法是为了给counter组件，而不是给redux或store
export const { adduser, deluser, addhistory,delhistory,addCollection,delCollection,addCaricature,delCaricature} = counterSlice.actions

//export给store
export default counterSlice.reducer
