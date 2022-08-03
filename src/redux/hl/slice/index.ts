import { createSlice } from "@reduxjs/toolkit";

//创建一个切片
export const hlSlice = createSlice({
  // 该切片的名字
  name: "hl_userdatas",
  //在创建实例时给定state 即vuex中的state数据
  initialState: {
    idlist: [2583],
  },
  // 操作数据的方法 相当于vuex中的mutations、actions
  reducers: {
    AddidList: (state, payload) => {
    //   console.log(payload.payload.item);
      if (!state.idlist.includes(payload.payload.item)) {
        state.idlist.push(payload.payload.item);
      }
    },
    DeleteidList: (state, payload:any) => {
        state.idlist=state.idlist.filter(item=>{
            return payload.payload.item!=item
        })
      },
  },
});


// 为每个 reducer 函数生成动作创建器（Action creators），action是就相当于是一个指令，根据这个指令，来进行相应的操作
//这里export的方法是为了给counter组件，而不是给redux或store
export const { AddidList,DeleteidList } = hlSlice.actions;

//export给store
export default hlSlice.reducer;
