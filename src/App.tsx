import React from 'react';
import logo from './logo.svg';
import './App.css';
import RouterMap from './router';
import { BrowserRouter } from 'react-router-dom';
import KTab from './components/tabbar';
function App() {
  return (
    <BrowserRouter>
    <RouterMap></RouterMap>
    <KTab></KTab>
    </BrowserRouter>
  );
}

export default App;
