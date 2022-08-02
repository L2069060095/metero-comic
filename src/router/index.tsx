import React from "react";
import { Routes, Route } from 'react-router-dom'
import Me from "../pages/me";
import World from "../pages/world";
import Book from "../pages/book";
import Search from "../pages/search";
import Detail from "../pages/detail";
import Slist from "../components/search/list";


function RouterMap(){
    return(
        <Routes>
             <Route path="/" element={<Book></Book>}></Route>
             <Route path="/world" element={<World></World>}></Route>
             <Route path="/me" element={<Me></Me>}></Route>
             <Route path="/search" element={<Search></Search>}></Route>
             <Route path="/detail" element={<Detail></Detail>}></Route>
             <Route path="/ser_detail" element={<Slist></Slist>}></Route>
        </Routes>
    )
}

export default RouterMap