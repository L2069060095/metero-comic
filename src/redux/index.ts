import { configureStore } from "@reduxjs/toolkit";

import historySlice from './history'
import sortSlice from "./sort";


// configureStore 用来创建store对象，需要一个配置对象作为参数
const store = configureStore({
    reducer: {
        history: historySlice.reducer,
        sort: sortSlice.reducer,
    }
});

export default store;


