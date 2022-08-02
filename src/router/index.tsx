import React from "react";
import { Routes, Route } from 'react-router-dom'
import Me from "../pages/me";
import World from "../pages/world";
import Book from "../pages/book";
import YCdetail from "../pages/hl/ycdetail";
import Test from "../pages/test"

// ws
import Login from "../components/ws/nav/login/login"
import Zhuce from "../components/ws/nav/login/zhuce/zhuce"

function RouterMap(){
    return(
        <Routes>
             <Route path="/" element={<Book></Book>}></Route>
             <Route path="/world" element={<World></World>}></Route>
             <Route path="/me" element={<Me></Me>}></Route>
             <Route path="/ycdetail" element={<YCdetail></YCdetail>}></Route>
             <Route path="/test" element={<Test></Test>}></Route>
             {/* ws */}
             <Route path="/login" element={<Login></Login>}></Route>
             <Route path="/zhuce" element={<Zhuce></Zhuce>}></Route>
        </Routes>
    )
}

export default RouterMap