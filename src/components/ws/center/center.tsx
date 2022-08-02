import React, { FC } from "react";
import {
    ClockCircleFill, HeartOutline, HistogramOutline, UnorderedListOutline,
    PayCircleOutline,
    SetOutline,
} from 'antd-mobile-icons'
import { Dropdown, Radio, Space, Swiper, List } from 'antd-mobile'

//两个都是react-redux的钩子函数
import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from "react-router";

//之前counterSlice导出的方法就直接用在组件上 直接引入指定切片中定义的方法
import { adduser, deluser } from "../../../redux/ws/slice"


const Center: FC = (props: any) => {

    const navigate = useNavigate()

    // 通过useSelector钩子函数，来获取store中指定切片中的数据  就相当于vuex中的mapState函数
    const userdatas = useSelector((store: any) => store.ws_userdatas.userdatas)
    // 通过dispatch钩子函数，传入切片中定义的方法，进行数据的操控
    const dispatch = useDispatch()

    // outlogin事件
    const outlogin = () => {
        dispatch(deluser({ type: "ws_userdatas/adduser", username: userdatas[0].payload.newuser.username }))
        navigate("/login")
    }

    const img = "https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"

    return <div style={{ padding: '2%' }}>

        <img src={userdatas.length == 0 ? img : userdatas[0].payload.newuser.img[0].url} style={{ width: "15%", height: "15%", borderRadius: "50%", marginLeft: "42.5%", marginTop: "5%" }}></img>

        <p style={{ textAlign: "center" }}>{userdatas.length == 0 ? "默认用户" : userdatas[0].payload.newuser.username}</p>
        <div style={{ marginTop: "10%" }}>
            <Space wrap style={{ fontSize: 22, marginLeft: "13%" }}><ClockCircleFill /></Space>
            <Space wrap style={{ fontSize: 22, marginLeft: "28%" }}><HistogramOutline /></Space>
            <Space wrap style={{ fontSize: 22, marginLeft: "27%" }}><HeartOutline /></Space>
        </div>
        <Dropdown>
            <Dropdown.Item key='sorter' title='浏览记录'>
            </Dropdown.Item>
            <Dropdown.Item key='bizop' title='书架'>
            </Dropdown.Item>
            <Dropdown.Item key='more' title='收藏'>
            </Dropdown.Item>
        </Dropdown>
        <div style={{ backgroundColor: "#fff" }}>
            <p style={{ marginLeft: "7%" }}>快看VIP<span style={{ color: "orange", marginLeft: "35%" }}>开通会员每日领取KK币</span></p>
        </div>
        <img src="http://imgs.aixifan.com/o_1cp6p00ojo221c1q1rommko1iut7p.png" style={{ width: "33%", height: "20%" }}></img>
        <img src="http://imgs.aixifan.com/o_1cp6p00oj3bsm00l9t2nh124q7q.jpg" style={{ width: "33%", height: "20%" }}></img>
        <img src="http://imgs.aixifan.com/o_1cp6p00oj1tarrit199p1one1fqi7t.png" style={{ width: "33%", height: "20%" }}></img>
        <p style={{ marginLeft: "7%" }}>快看卡片</p>
        <List>
            <List.Item prefix={<UnorderedListOutline />} onClick={() => { }}>
                快看商城
            </List.Item>
            <List.Item prefix={<PayCircleOutline />} onClick={() => { }}>
                体闲时刻
            </List.Item>
            <List.Item prefix={<SetOutline />} onClick={() => { }}>
                创作者中心
            </List.Item>
            {userdatas.length != 0 && <List.Item prefix={<SetOutline />} onClick={() => { outlogin() }}>
                退出登录
            </List.Item>}
        </List>
    </div>
}

export default Center