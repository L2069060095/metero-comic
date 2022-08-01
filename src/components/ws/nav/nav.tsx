import React, { FC, useEffect, useState } from "react";
import { NavBar, SearchBar, FloatingBubble, Toast, Button, Form, Input, Dialog, Image } from 'antd-mobile'
import { MessageFill } from 'antd-mobile-icons'
import { useNavigate } from "react-router";

//两个都是react-redux的钩子函数
import { useSelector, useDispatch } from 'react-redux'

import "./nav.scss"

const Nav: FC = () => {

     // 通过useSelector钩子函数，来获取store中指定切片中的数据  就相当于vuex中的mapState函数
     const userdatas = useSelector((store: any) => store.ws_userdatas.userdatas)

    // 图片地址
    const [img, setimg] = useState(true)

    // 实例化跳转
    const navigate = useNavigate()

    //返回按钮事件
    const back = () => {
        navigate(-1)
    }

    // 悬浮点击按钮事件
    const onClick = () => {
        Toast.show('你点击了气泡')
        console.log(img)
    }

    // login按钮事件
    const login = () => {
        navigate("/login")
    }

    return <div>
        <NavBar className="nav" onBack={back} backArrow={true} left={<img src="https://cdn.imgcn.top/20191017/e04d24c194da5f799b4f82a3acab5261.jpg!logo" style={{ width: "8%", height: "8%", marginLeft: "10%" }} ></img>}  right={userdatas.length==0&&<Button style={{marginRight:"10%"}} color='warning' size="mini" onClick={login}>登录</Button>}>
            {/* 搜索框 */}
            <SearchBar
                placeholder='请输入内容'
                showCancelButton
                style={{
                    '--border-radius': '100px',
                    '--background': '#ffffff',
                    '--height': '50%',
                    '--padding-left': "20%"
                }}
            ></SearchBar>
            {/* 浮动按钮 */}
            <FloatingBubble
                style={{
                    '--initial-position-bottom': '24px',
                    '--initial-position-right': '24px',
                    '--edge-distance': '24px',
                }}
                onClick={onClick}
            >
                <MessageFill fontSize={32} />
            </FloatingBubble>
        </NavBar>
    </div>
}
export default Nav

