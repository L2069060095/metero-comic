import React, { FC, useEffect, useState, useContext } from "react";
import axios from "axios";
import { List, Card, Toast, Button } from 'antd-mobile';
import styles from './index.module.scss';
import './indexList.scss';
import { SmileOutline, RightOutline, HeartOutline } from 'antd-mobile-icons';
const Ranking: FC = () => {
    // 列表数据
    let [rank_types, setrank_type] = useState<any>([]);
    // 内容数据
    let [rank_desc, setrank_desc] = useState<any>([]);
    let [rank_desc_topics, set_topics] = useState<any>([]);
    // rank_desc_topics = rank_desc.map((item:any,index:number)=>{
    //     console.log(item,"xxxxxxxxxxxxxxxxxxxxx");
    // })
    // 内容请求
    const GetDetialBody = async () => {
        let result = await axios.get("/v2/pweb/all_rank/topics", {});
        setrank_desc(result.data.data.ranks);
        set_topics(result.data.data.ranks[0].topics);
        console.log(result.data.data.ranks[0].topics[0].title);
    };
    // 列表请求
    const GetDetialTitle = async () => {
        let result = await axios.get("/v2/pweb/rank_type_list", {});
        setrank_type(result.data.data.rank_types);
        set_topics([]);
    };

    const onClick = () => {
        Toast.show('点击了卡片')
    }

    const onHeaderClick = () => {
        Toast.show('点击了卡片Header区域')
    }

    const onBodyClick = () => {
        Toast.show('点击了卡片Body区域')
    }

    // 调用请求
    useEffect(
        () => {
            GetDetialTitle();
            GetDetialBody();
        }, []);

    return <div className="allList">
        {/* --------------------头部部分--------------------- */}
        <div className="ListHeader">
            <List header="猜你喜欢" key={rank_types.id}>
                {
                    rank_types.map((item: any, index: any) => <List.Item
                        key={item.rank_id}
                    >
                        <a href="#">{item.title}</a>
                    </List.Item>)
                }
                <p className="more"><a href="#">更多...</a></p>
            </List>
        </div>
        {/* ------------------body部分------------------------ */}
        <div className="ListBody">
            {
                rank_desc.map((item: any, index: any) => <Card
                    title={
                        <div style={{ fontWeight: 'normal' }}>
                            {item.title}
                            < SmileOutline style={{ marginRight: '4px', color: '#1677ff' }} />
                        </div>
                    }
                    extra={<RightOutline />}
                    onBodyClick={onBodyClick}
                    onHeaderClick={onHeaderClick}
                    style={{ borderRadius: '16px' }}
                >
                    <div className={styles.content}>
                        <img src={item.topics[0].vertical_image_url} alt="" />
                        <div className="Book_Detail"> <h2> <HeartOutline /> {item.topics[0].title}</h2> </div>
                        <div className="Book_username">{item.topics[0].user.nickname}</div>
                        <div className="Book_introduce">{item.topics[0].description}</div>
                        <div className="Book_update">更新至:{item.topics[0].latest_comic.title}</div>
                        <div className={styles.footer} onClick={e => e.stopPropagation()}>
                            <Button
                                onClick={() => Toast.show('点击了底部按钮')}
                            >
                                点击阅读
                            </Button>
                        </div>
                    </div>
                </Card>
                )}
        </div>
    </div>
}
export default Ranking