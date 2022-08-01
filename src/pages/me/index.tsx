import React, { FC, useEffect, useState } from "react";
import axios from "axios"

//两个都是react-redux的钩子函数
import { useSelector, useDispatch } from 'react-redux'

//之前counterSlice导出的方法就直接用在组件上 直接引入指定切片中定义的方法
import { adduser, deluser } from "../../redux/ws/slice"

import Nav from "../../components/ws/nav/nav"

const Me: FC<any> = (props): any => {

    const [img,setimg]=useState()

    // 通过useSelector钩子函数，来获取store中指定切片中的数据  就相当于vuex中的mapState函数
    const userdatas = useSelector((store: any) => store.ws_userdatas.userdatas)
    // 通过dispatch钩子函数，传入切片中定义的方法，进行数据的操控
    const dispatch = useDispatch()

    //blob文件转化
    function httpRequest(src: any) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', src, true);
            xhr.responseType = 'blob';
            xhr.onload = function (e) {
                if (this.status == 200) {
                    let myBlob = this.response;
                    let files = new window.File([myBlob], myBlob.type, { type: myBlob.type }) // myBlob.type 自定义文件名
                    resolve(files)
                    // setimg(files)
                } else {
                    reject(false)
                }
            };
            xhr.send();
        })
    }

    useEffect(() => {
        console.log(userdatas, "切片中的数据")
    }, [])

    return (
        <div>
            <Nav></Nav>
            <img src={img}></img>       
            <button onClick={()=>httpRequest(userdatas[0].payload.payload.img[0].url)}>点击获取</button>
        </div>
    )
}

export default Me