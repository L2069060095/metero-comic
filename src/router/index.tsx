import React from "react";
import { Routes, Route } from 'react-router-dom'
import Me from "../pages/me";
import World from "../pages/world";
import Book from "../pages/book";
import YCdetail from "../pages/hl/ycdetail";


function RouterMap(){
    return(
        <Routes>
             <Route path="/" element={<Book></Book>}></Route>
             <Route path="/world" element={<World></World>}></Route>
             <Route path="/me" element={<Me></Me>}></Route>
             <Route path="/ycdetail" element={<YCdetail></YCdetail>}></Route>
        </Routes>
    )
}

export default RouterMap