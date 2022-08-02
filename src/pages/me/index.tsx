import React, { FC, useEffect, useState } from "react";

//两个都是react-redux的钩子函数
import { useSelector, useDispatch } from 'react-redux'

// 引入导航栏
import Nav from "../../components/ws/nav/nav"

// 引入页面中间部分
import Center from "../../components/ws/center/center"

const Me: FC<any> = (props): any => {

    // 通过useSelector钩子函数，来获取store中指定切片中的数据  就相当于vuex中的mapState函数
    const userdatas = useSelector((store: any) => store.ws_userdatas.userdatas)

    useEffect(() => {
        console.log(userdatas, "切片中的数据")
    }, [])

    return (
        <div>
            <Nav></Nav>
            <Center></Center>
        </div>
    )
}

export default Me