import React, { FC, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { InfiniteScroll, List, Image, Grid } from 'antd-mobile'
import { LikeOutline, HeartOutline } from 'antd-mobile-icons'
import "./index.scss"
import { useNavigate } from 'react-router-dom';
//两个都是react-redux的钩子函数
import { useSelector, useDispatch } from 'react-redux'
//写在redux的方法
import { addworldData } from "../../redux/flp/sliceflp/worldSlice";

//普通函数是没法返回JSX的，所以这里用FC声明函数组件
const World: FC = () => {
    const dispatch = useDispatch()

    let navigate = useNavigate();
    const [data, setData] = useState<any>([])
    const [labelsData, setlabelsData] = useState<any>([])
    //无限滚动
    // const [hasMore, setHasMore] = useState(true)
    const { loading: loading3, fetchData } = useFetch<any>({}, false);
    const getWorldData = async () => {
        //拿到数据
        let result = await fetchData({
            method: "get",
            url: '/v1/graph/pc/feeds/getRecommendFeed?uid=0&webTokenId=1615007958330_FFwnyURnzD0rgO2&since=0&limit=20',
        })
        //这里展开得到的是放着20个对象的数组
        setData([...result.universalModels])
    };

    const deliver = (item: any) => {
        //点击时传入当前item，将item存入切片
        dispatch(addworldData({ type: "worlds/addworldData", detaildatas: item }))
        navigate("/world/detail")
    }
    
     
        
    
    // 在生命周期中执行副作用操作
    useEffect(() => {
        getWorldData()
    }, [])
    return (
        <div>
            <Grid columns={2}>
                {data.map((item: any, index1: any) => {
                    return <Grid.Item key={item.post.summary}>
                        <div className="dataList" onClick={() => { deliver(item.post) }}>
                            <Image src={item.post.recommendCover.content} lazy/>
                            <div className="labelsName" style={{ width: "100%", height: "16px", overflow: "hidden" }}>
                                <span style={{ fontSize: 12 }}>
                                    {item.post.labels.map((item: any, index: any) => {
                                        return <span key={item.name} style={{ margin: "0 2px" }}>
                                            <span className="mark">#</span>
                                            {item.name}
                                        </span>
                                    })}
                                </span>
                            </div>
                            <div className="postTitle">{item.post.title}</div>
                            <div className="postUser">
                                <span ><Image className="userImg" style={{ height: 15, borderRadius: "50%" }} src={item.post.user.avatar_url} /></span>
                                <span className="nickname">{item.post.user.nickname}</span>
                                <span className="likeCount"><HeartOutline className="love" /><LikeOutline />{item.post.strLikeCount}</span>
                            </div>
                        </div>
                    </Grid.Item>
                }
                )}
            </Grid>
        </div >
    )
}
export default World;
