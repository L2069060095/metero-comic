import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//引入redux中的 Provider ，使本程序可以访问store中的数据,将store中的数据传递到本程序中
import { Provider } from "react-redux"
// 引入store仓库
import store from '../src/redux/ws/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
