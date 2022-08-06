import React, { FC, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Image, List, NavBar } from "antd-mobile";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import "./index.scss"
import axios from "axios"
import { Toast } from "antd-mobile"
import { HeartFill, StarFill } from "antd-mobile-icons";
import "./index.scss";

//两个都是react-redux的钩子函数
import { useSelector, useDispatch } from "react-redux";

//之前counterSlice导出的方法就直接用在组件上 直接引入指定切片中定义的方法

import { addhistory, delhistory, addCollection, delCollection, addCaricature, delCaricature } from "../../redux/ws/slice"

const Detail: FC = () => {
    // 通过useSelector钩子函数，来获取store中指定切片中的数据  就相当于vuex中的mapState函数
    const userdatas = useSelector((store: any) => store.ws_userdatas.userdatas);
    // 通过dispatch钩子函数，传入切片中定义的方法，进行数据的操控
    const dispatch = useDispatch();

    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    // console.log(searchParams.get("id"));
    const detail_id = searchParams.get("id");

    const { loading: detailLoading, data: detailData } = useFetch({
        // https://m.kuaikanmanhua.com/search/mini/hot_word?&page=2&size=10
        // https://m.kuaikanmanhua.com/
        // https://www.kuaikanmanhua.com//v2/pweb/comic/353105 
        url: `/v2/pweb/topic/${detail_id}`,
        method: "GET",
    })

    var a = []
    var flag = true

    for (const key in detailData) {
        if (Object.prototype.hasOwnProperty.call(detailData, key)) {
            const element = detailData[key];
            a.push(element)
        }
    }

    const addbookstore = async () => {
        Toast.show({
            icon: 'success',
            content: "添加成功！",
        })
        select()
        dispatch(addCaricature({ type: "ws_userdatas/addCaricature", newcaricature: [{ id: a[0].id, title: a[0].title, vertiacl_img_url: a[0].cover_image_url }] }))
    }

    const select = () => {
        userdatas[0].caricature.payload.newcaricature.map((item) => {
            console.log(a[0].id, item.id)
            if (a[0].id ===item.id) {
                flag = false
            }
        })
    }

    useEffect(() => {

    }, [])

    return <div>
        {detailData &&
            <div>
                <NavBar onBack={() => navigate(-1)}>
                    {detailData.topic_info.title}
                </NavBar>
                <div className="tlt">
                    <Image
                        src={detailData.topic_info.cover_image_url}
                        width={350}
                        height={220}
                        fit="fill"
                        style={{ borderRadius: 10 }}
                        className="img"
                    />
                    <div className="text">
                        <p>{detailData.topic_info.title}</p>
                        <p>{detailData.topic_info.user.nickname}</p>
                        <span>漫画简介</span>
                        <p>{detailData.topic_info.description}</p>
                    </div>
                    {flag&&<div
                        style={{
                            color: "orange",
                            fontSize: 28,
                            marginLeft: "93%",
                            marginTop: "-43%",
                            float: "left",
                        }}
                        onClick={addbookstore}
                    >
                        <StarFill />
                    </div>}
                </div>
                <section>
                    <List>
                        {detailData.topic_info.comics.map((item: any) => (<List.Item className="item" key={item.id} prefix={
                            <Image
                                src={item.cover_image_url}
                                style={{ borderRadius: 10 }}
                                fit='fill'
                                width={168}
                                height={94} />
                        }
                            description={item.title}
                        >
                        </List.Item>))

                        }
                    </List>
                </section>
            </div>
        }
    </div>
}
export default Detail

