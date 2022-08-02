// 创建一个store仓库

import { configureStore } from '@reduxjs/toolkit';

//一般都以组件名xxxReducer方式命名，而不叫xxxSlice，因为这里import的是导出的counterSlice.reducer
import counterReducer from "../slice/index";
import historySlice from "../../history"
import sortSlice from "../../sort"

// configureStore创建一个redux数据
const store = configureStore({
    reducer: {
        ws_userdatas: counterReducer,//这里给定的名字最好与counterSlice中的name相同
        history: historySlice.reducer,
        sort: sortSlice.reducer,
    },
});

export default store