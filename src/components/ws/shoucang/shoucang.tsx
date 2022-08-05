import React, { FC } from "react";
//两个都是react-redux的钩子函数
import { useSelector, useDispatch } from 'react-redux'
import { addhistory, delhistory, addCollection, delCollection, addCaricature, delCaricature } from "../../../redux/ws/slice"

import { Card, Toast } from "antd-mobile"

import { DeleteOutline, LikeOutline, FrownOutline } from "antd-mobile-icons"

import Nav2 from "../nav2/nav2";

import axios from 'axios'

const Shoucang: FC = (): any => {

    // 通过useSelector钩子函数，来获取store中指定切片中的数据  就相当于vuex中的mapState函数
    const userdatas = useSelector((store: any) => store.ws_userdatas.userdatas)
    const dispatch = useDispatch();

    // 判断是否存在
    var historyflag = false
    var caricatureflag = false
    var collectionflag = false
    var payload = false
    var flag = false
    for (const iterator in userdatas[0]) {
        if (iterator === "history") {
            historyflag = !historyflag
        } else if (iterator === "caricature") {
            caricatureflag = !caricatureflag
        } else if (iterator === "collection") {
            collectionflag = !collectionflag
        }
        else if (iterator === "payload") {
            payload = !payload
        }
    }
    if (payload == true) {
        if (caricatureflag == false) {
            flag = !flag
        }
    }


    const del = (id) => {
        Toast.show({
            icon: 'success',
            content: "删除成功！",
        })
        console.log(id, "xxxxxxxxx")
        let datas = dispatch(delCaricature({ type: "ws_userdatas/delCaricature", id: id }))
        console.log(datas, "fromdel")
        // axios.post("http://localhost:3000/api/addcaricature", {
        //     paramsObj: { username: userdatas[0].payload.newuser.username, password: userdatas[0].payload.newuser.password, img: userdatas[0].payload.newuser.img, caricature: userdatas[0].caricature.payload.newcaricature }//数组
        // })
    }

    return <div style={{ padding: "0 0 50px 0" }}>
        <Nav2></Nav2>
        <div style={{ backgroundColor: "#eee", width: "100%", color: "#eee", height: "55px" }}></div>
        {!payload && <div style={{ color: "orange", textAlign: "center", fontSize: "26px", marginTop: "60%" }}><FrownOutline /><p style={{ color: "#ccc", textAlign: "center", fontSize: "26px" }}>请先登录！</p></div>}
        {flag && <div style={{ color: "orange", textAlign: "center", fontSize: "26px", marginTop: "60%" }}><LikeOutline /><p style={{ color: "#ccc", textAlign: "center", fontSize: "18px" }}>逛逛书城，添加喜欢的漫画吧！</p></div>}
        {caricatureflag && userdatas[0].caricature.payload.newcaricature.map((item: any) => {
            return <div style={{ backgroundColor: '#eee', padding: "10px 10px" }} key={item.id}>
                <Card title={item.title} style={{}}>
                    <img src={item.vertiacl_img_url} style={{ width: "100%" }}></img>
                    <span onClick={() => del(item.id)} style={{ marginLeft: "92%" }} ><DeleteOutline style={{ color: "gray", fontSize: "26px", }} /></span>
                </Card>
            </div>
        })

        }

    </div>
}

export default Shoucang
