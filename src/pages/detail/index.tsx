import React, { FC } from "react";
import useFetch from "../../hooks/useFetch";
import { Image, List, NavBar } from 'antd-mobile'
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import "./index.scss"

const Detail: FC = () => {
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams();
    // console.log(searchParams.get("id"));
    const detail_id = searchParams.get("id")

    const { loading: detailLoading, data: detailData } = useFetch({
        // https://m.kuaikanmanhua.com/search/mini/hot_word?&page=2&size=10
        // https://m.kuaikanmanhua.com/
        // https://www.kuaikanmanhua.com//v2/pweb/comic/353105 
        url: `/v2/pweb/topic/${detail_id}`,
        method: "GET",

    })

    console.log('xxxxxxxxxxx', detailLoading, detailData);



    return (<div>

        {detailData && <div>
            <NavBar onBack={()=>navigate(-1)}></NavBar>
            <div className="tlt">
                <Image src={detailData.topic_info.cover_image_url} width={350} height={220} fit='fill'
                    style={{ borderRadius: 10 }} className="img" />
                <div className="text">
                    <p>{detailData.topic_info.title}</p>
                    <p>{detailData.topic_info.user.nickname}</p>
                    <span>漫画简介</span>
                    <p>{detailData.topic_info.description}</p>
                </div>
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
        </div>}

    </div>)
}

export default Detail