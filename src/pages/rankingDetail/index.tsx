import React, { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Collapse,NavBar } from 'antd-mobile';
import { useNavigate } from "react-router";
import axios from "axios";
import './rankingDetail.scss';
import Item from "antd-mobile/es/components/dropdown/item";
const RanDetail: FC = () => {
    let [rankParams, setSearchParams] = useSearchParams();
    const rank_id = rankParams.get("id");
    let [rank_topics, setTopics] = useState<any>([])
    const navigate = useNavigate();
    const GetrankDetail = async () => {
        let result = await axios.get(`v2/pweb/rank/topics?rank_id=${rank_id}`, {})
        console.log(result.data.data.rank_info.topics, "xxxxxxxxxxxxxxxxxxxxxxxxx");
        setTopics(result.data.data.rank_info.topics);
    }

    useEffect(
        () => {
            GetrankDetail()
        }, [])

    return <div>
        
        <div className="Collapse_P">
        <NavBar onBack={() => { navigate(-1)}}>重大详情</NavBar>
            {
                <Collapse accordion={true}  defaultActiveKey={'0'}>
                    {rank_topics.map((item: any, index: any) =>
                        <Collapse.Panel key={index} title={`${index}---${item.title}`}>
                            <div className="Collapse_user"> 作者: {item.user.nickname} </div>
                            <div className="Collapse_updata"> 更新时间: {item.update_remind} </div>
                            <div className="Collapse_image"><img src={item.cover_image_url} alt="" /></div>
                            <div className="Collaps_read"> 简牍: {item.description} </div>
                        </Collapse.Panel>
                    )}
                </Collapse>
            }
        </div>
    </div>
}

export default RanDetail