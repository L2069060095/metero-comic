import React, { FC, useEffect, useState } from "react";
import { NavBar, SearchBar, FloatingBubble, Toast, Button} from 'antd-mobile'
import { MessageFill } from 'antd-mobile-icons'
import { useNavigate } from "react-router";

import "./nav2.scss"

const Nav2: FC = () => {

    // 图片地址
    const [img, setimg] = useState(true)

    // 实例化跳转
    const navigate = useNavigate()

    //返回按钮事件
    const back = () => {
        navigate(-1)
    }


    return <div>
        <NavBar className="nav" onBack={back} backArrow={true} left={<img src="https://cdn.imgcn.top/20191017/e04d24c194da5f799b4f82a3acab5261.jpg!logo" style={{ width: "8%", height: "8%", marginLeft: "10%"}} ></img>}>
           
        </NavBar>
    </div>
}
export default Nav2

