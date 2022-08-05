import React, { FC } from "react";
import {
    ClockCircleFill, HeartOutline, HistogramOutline,
    SetOutline,
    SmileOutline,
    MovieOutline,
    FireFill,
    ShopbagOutline,
    CloseCircleFill
} from 'antd-mobile-icons'
import { Dropdown, Space, List, Swiper } from 'antd-mobile'
import 'react-virtualized/styles.css'
import { List as VirtualizedList, AutoSizer } from 'react-virtualized'

//两个都是react-redux的钩子函数
import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from "react-router";

//之前counterSlice导出的方法就直接用在组件上 直接引入指定切片中定义的方法
import { adduser, deluser } from "../../../redux/ws/slice"

import "./center.scss"


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

    // 判断是否存在history
    var historyflag = false
    var caricatureflag = false
    var collectionflag = false
    for (const iterator in userdatas[0]) {
        if (iterator === "history") {
            historyflag = !historyflag
        } else if (iterator === "caricature") {
            caricatureflag = !caricatureflag
        } else if (iterator === "collection") {
            collectionflag = !collectionflag
        }
    }

    // 默认头像
    const img = "https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"

    const toshoucang = () => {
        console.log("xxxx")
        navigate("/shoucang")
    }

    // 轮播图片
    const imglist = ["http://imgs.aixifan.com/o_1cp6p00oj1v8rob91a3q187um9t81.jpg", "http://imgs.aixifan.com/o_1cp6p00ojo221c1q1rommko1iut7p.png", "http://imgs.aixifan.com/o_1cp6p00oj1pqm1bo212gt7uh1os783.jpg", "http://imgs.aixifan.com/o_1cp6p00okmbt1qg83tl14jl6u286.png"]

    // 轮播
    const items = imglist.map((item, index) => (
        <Swiper.Item key={index} >
            <div>
                <img src={item} style={{ width: "100%" }}></img>
            </div>
        </Swiper.Item>
    ))

    return <div style={{ padding: '5% 5% 12% 5%' }}>

        <img src={userdatas.length == 0 ? img : userdatas[0].payload.newuser.img[0].url} style={{ width: "16%", height: "16%", borderRadius: "50%", marginLeft: "42%", marginTop: "10%" }}></img>

        <p style={{ textAlign: "center" }}><span>用户名：</span>{userdatas.length == 0 ? "默认用户" : <span style={{fontSize:"12px"}}>{userdatas[0].payload.newuser.username}</span>}</p>
        <div style={{ marginTop: "10%" }}>
            <Space wrap style={{ fontSize: 22, marginLeft: "14%" ,color:"#ccc"}}><ClockCircleFill /></Space>

            <Space wrap style={{ fontSize: 22, marginLeft: "28%",color:"#ccc" }} onClick={toshoucang}><HistogramOutline /></Space>

            <Space wrap style={{ fontSize: 22, marginLeft: "28%",color:"#ccc"  }}><HeartOutline /></Space>
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}><span style={{ flex: "1", textAlign: "center" }}>历史记录</span><span style={{ flex: "1", textAlign: "center" }}>书架</span><span style={{ flex: "1", textAlign: "center" }}>关注</span></div>
        <div style={{ backgroundColor: "#fff" }}>
            <p style={{ backgroundColor:"#eee" ,color:"purple",padding:"6px",borderRadius:"10px"}}>快看VIP<span style={{ color: "purple", marginLeft: "35%" }}>开通会员每日领取KK币</span></p>
        </div>

        {/* 轮播 */}
        <Swiper autoplay loop autoplayInterval={2000} direction='vertical' slideSize={120}
            stuckAtBoundary={false}
            style={{ '--height': '180px' ,'--border-radius':"25px"}}>{items}</Swiper>

        <List>
            <List.Item prefix={<ShopbagOutline />} onClick={() => { }}>
                快看商城
            </List.Item>
            <List.Item prefix={<SmileOutline />} onClick={() => { }}>
                体闲时刻
            </List.Item>
            <List.Item prefix={<MovieOutline />} onClick={() => { }}>
                娱乐休闲
            </List.Item>
            <List.Item prefix={<FireFill />} onClick={() => { }}>
                <span style={{}}>轻松一刻</span>
            </List.Item>
            <List.Item prefix={<SetOutline />} onClick={() => { }}>
                创作者中心
            </List.Item>
            {userdatas.length != 0 && <List.Item prefix={<CloseCircleFill />} onClick={() => { outlogin() }}>
            <span style={{color:"red"}}>退出登录</span>
            </List.Item>}
        </List>
    </div>
}

export default Center