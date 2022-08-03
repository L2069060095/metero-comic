import React, { FC, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { InfiniteScroll, List, Image, Grid } from 'antd-mobile'
import { LikeOutline, StarOutline } from 'antd-mobile-icons'
import "./index.scss"
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Space, Swiper, Toast } from 'antd-mobile'

const WorldDetail: FC = () => {
    // 从redux拿取数据，输出发现是一个数组，里面放着一个对象
    const worldData = useSelector((store: any) => store.worlds.worldSliceDatas)
    console.log(worldData)
    //将从redux到的数先进行处理转化，再使用
    //这里的data相当于每一个post对象，这是一个放着一个对象的数组
    const data =  []
    {
        for (const key in worldData) {
            const element = worldData[key].payload.detaildatas
            data.push(element)
            //判断worldData上是否有key这个属性
            // if (Object.prototype.hasOwnProperty.call(worldData, key)) {
            //     const element = worldData[key].payload.detaildatas;
            //     // console.log(element)
            //     data.push(element)
            // }
        }
    }
    
    // 在生命周期中执行副作用操作
    useEffect(() => {
    }, [])
    return (
        <div className="data">
            <div className="userTitle">{data[0].title}</div>
            <div className="userdata">
                <span className="userimg"><Image src={data[0].user.avatar_url}></Image></span>
                <span className="nickname">{data[0].user.nickname}</span>
            </div>
            <div>
            <Image src={data[0].recommendCover.content}></Image>
            </div>
           <div className="userCreate"><span>创作</span> {data[0].title}</div>
           <div className="userSummary">{data[0].summary}</div>
           <div className="originCreate"><span>原创</span> 版权归作者所有，未经授权禁止转载</div>
           <div className="labelName">
               <span className="marks">#</span>{data[0].labels.name}
           </div>
           <div className="userStr">{data[0].createTimeStr}<span>|</span>{data[0].strViewCount}浏览</div>
        </div>
    )
}
export default WorldDetail;
