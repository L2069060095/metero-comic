import React, { FC, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import useFetch2 from "../../hooks/useFetch2";
import { NavBar, Toast, SearchBar, Card, Swiper, CapsuleTabs, Image } from "antd-mobile";
import { DeleteOutline, RedoOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setContent, delContent } from "../../redux/history";
import { setTag, setSort, setUpdate_status } from "../../redux/sort";
import "./index.scss"

const Search: FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 搜索热词部分
    let [page, setPage] = useState(1);
    const [result, setResult] = useState<any>([])
    const refresh = () => {
        setPage(page + 1)
        if (page > 5) {
            setPage(page = 1)
        }
        // console.log(page);
    }
    const { loading: loading, fetchData } = useFetch2({}, false);
    const hotList = async () => {
        let result = await fetchData({
            method: "get",
            url: `/test/search/mini/hot_word?&page=${page}&size=10`,
        })
        // console.log(result)  
        setResult(result)
    }
    useEffect(() => {
        hotList()
    }, [page])


    // 根据选择要求筛选漫画
    const [result2, setResult2] = useState<any>([])
    // const [tag, setTag] = useState(0)
    // const [sort, setSort] = useState(1)
    // const [update_status, setUpdate_status] = useState(0)

    const sortitem: any = useSelector((state) => state)
    // console.log("zzzzzzzzzz", sortitem);

    // tag
    const themeChange = (e: any) => {
        dispatch(setTag(e))
    }
    // update_status
    const progressChange = (e: any) => {
        dispatch(setUpdate_status(e))
    }
    // sort
    const sortChange = (e: any) => {
        dispatch(setSort(e))
    }
    const { loading: loading2, fetchData: fetch } = useFetch({}, false);
    const sortList = async () => {
        let res = await fetch({
            method: "get",
            url: `/v1/search/by_tag?since=0&count=60&f=3&tag=${sortitem.sort.tag}&sort=${sortitem.sort.sort}&query_category={'update_status':${sortitem.sort.update_status}}`,
        })
        // console.log(res)
        setResult2(res)
    }
    useEffect(() => {
        Toast.show("正在加载")
        sortList()

    }, [sortitem.sort.tag, sortitem.sort.sort, sortitem.sort.update_status])

    // sort数据
    const sortitems = [{
        sort: "1",
        title: "推荐"
    },
    {
        sort: "2",
        title: "最火热"
    },
    {
        sort: "3",
        title: "新上架"
    },]

    // 轮播图片数据
    const swiper_pic = ["https://tn1-f2.kkmh.com/image/210910/WpJrxxstS.webp-w320.w.jpg",
        "https://tn1-f2.kkmh.com/image/180529/cujlnna37.webp-w320.w.jpg",
        "https://tn1-f2.kkmh.com/image/220622/wWVoCOYRT.webp-w320.w.jpg"
    ]

    const items = swiper_pic.map((item, index) => (
        <Swiper.Item key={index}>
            <div
                className="content"
            >
                <Image src={item} width={240} height={318} fit='fill' />
            </div>
        </Swiper.Item>
    ))

    // 跳转漫画详情
    const toDetail = (id: any) => {
        navigate(`/detail?id=${id}`)
    }

    // 搜索功能  搜索历史

    const selector: any = useSelector((state) => state)
    // console.log(selector.history.content, 'xxxxxxx');

    const search = (val: any) => {
        // Toast.show(`你搜索了${val}`)
        navigate(`/ser_detail?q=${val}`)

        dispatch(setContent(val))
    }

    const del_history = () => {
        const d: any = []
        dispatch(delContent(d))
    }


    return (
        <div>
            <NavBar backArrow={false} right={<div className="cancel"><span onClick={() => navigate(-1)}>取消</span></div>}>
                <SearchBar placeholder='搜索作品、作者、社区内容' onSearch={val => {
                    search(val)
                }} />
            </NavBar>

            <div><span className="history">历史</span> <DeleteOutline className="del" onClick={() => del_history()} /></div>

            {selector.history.content && selector.history.content.map((item: any, idx: any) => <div key={idx} className="historyItem">
                {item}
            </div>
            )}


            <Card title={
                <div style={{ fontWeight: 'normal' }}>
                    全站热搜
                </div>
            } className="card" extra={<RedoOutline onClick={() => refresh()} />}>
                {!loading && result.hot_word.map((item: any) => <div className="title" key={item.target_id}
                    onClick={() => toDetail(item.target_id)}>
                    {item.target_title}
                </div>
                )}

            </Card>

            <Swiper autoplay loop>{items}</Swiper>

            <div className="sort">


                <span className="tlt">题材</span>
                <CapsuleTabs onChange={(e) => themeChange(e)}>
                    {!loading2 && result2.tags.map((list: any) => <CapsuleTabs.Tab title={list.title}
                        key={list.tag_id}>

                    </CapsuleTabs.Tab>
                    )}
                </CapsuleTabs>

                <span className="tlt">进度</span>
                <CapsuleTabs onChange={(e) => progressChange(e)}>
                    {!loading2 && result2.update_status.map((list: any) => <CapsuleTabs.Tab title={list.description} key={list.code}>

                    </CapsuleTabs.Tab>
                    )}
                </CapsuleTabs>

                <span className="tlt">排序</span>
                <CapsuleTabs onChange={(e) => sortChange(e)}>
                    {sortitems.map(item => <CapsuleTabs.Tab title={item.title} key={item.sort}></CapsuleTabs.Tab>
                    )}
                </CapsuleTabs>
            </div>

            <div>
                <ul>
                    {!loading2 && result2.topics.map((item: any) => <li key={item.id}>
                        <Image src={item.vertical_image_url} width={150} height={200} fit='fill'
                            style={{ borderRadius: 10 }} className="image" onClick={() => toDetail(item.id)} />
                        <p className="p_title">{item.title}</p>
                    </li>)}
                </ul>
            </div>

        </div >
    )
}

export default Search