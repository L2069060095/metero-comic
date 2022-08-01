import React, { FC, useEffect, useState } from "react";
import axios from "axios"

//两个都是react-redux的钩子函数
import { useSelector, useDispatch } from 'react-redux'

//之前counterSlice导出的方法就直接用在组件上 直接引入指定切片中定义的方法
import { adduser, deluser } from "../../redux/ws/slice"

import Nav from "../../components/ws/nav/nav"

const Me: FC<any> = (props): any => {

    // 通过useSelector钩子函数，来获取store中指定切片中的数据  就相当于vuex中的mapState函数
    const userdatas = useSelector((store: any) => store.ws_userdatas.userdatas)
    // 通过dispatch钩子函数，传入切片中定义的方法，进行数据的操控
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(userdatas, "切片中的数据")
    }, [])

    return (
        <div>
            <Nav></Nav>    
            {/* <button>点击获取</button> */}
        </div>
    )
}

export default Me