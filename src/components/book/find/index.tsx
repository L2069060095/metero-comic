import React, { useState, useEffect, FC, useContext, useReducer } from "react";
import DU from "../updata";
import CL from "../class";
import {
  Space,
  Tag,
  Swiper,
  Grid,
  Image,
  CapsuleTabs,
  Button,
} from "antd-mobile";
import "./index.scss";
import useFetch from "../../../hooks/useFetch";
import {
  AntOutline,
  RightOutline,
  EyeInvisibleOutline,
  AddOutline,
  StarFill,
  HeartFill
} from "antd-mobile-icons";
import { useNavigate } from "react-router";

//两个都是react-redux的钩子函数
import { useSelector, useDispatch } from 'react-redux'
//之前counterSlice导出的方法就直接用在组件上 直接引入指定切片中定义的方法
import { delhistory, addCollection, delCollection, addCaricature, delCaricature } from "../../../redux/ws/slice"

const Find: FC = () => {
  // 通过useSelector钩子函数，来获取store中指定切片中的数据  就相当于vuex中的mapState函数
  const userdatas = useSelector((store: any) => store.ws_userdatas.userdatas)
  // 通过dispatch钩子函数，传入切片中定义的方法，进行数据的操控
  const dispatch = useDispatch()

  const addcollection = (list, index) => {
    console.log(list, index)
    dispatch(addCollection({ type: "ws_userdatas/addCollection", newcollection: [{ id: list[index].id, title: list[index].title, vertiacl_img_url: list[index].cover_image_url }] }))
  }

  // 轮播图数据
  let [bannerslist, setbannerslist] = useState([]);
  //分类导航数据
  let [categories, setcategories] = useState([]);
  //每日更新数据
  let [daily_topics, setdaily_topics] = useState([]);
  //飙升榜数据
  let [days, setdays] = useState([]);
  let [isLoggedIn, setisLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [placement, setPlacement] = useState("top");

  let [isActive, seisActiv] = useState(0);
  let [YClist, setYClist] = useState<any>([]);
  let [discovery_modules, setdiscovery_modules] = useState([]);
  let [popularity_topics, setpopularity_topics] = useState([]);
  let [ranks, setranks] = useState([]);
  let [rec_topics, setrec_topics] = useState([]);
  let [ugc_topics, setugc_topics] = useState([]);
  const { loading: loading3, fetchData } = useFetch<any>({}, false);
  const GetHomelist = async () => {
    let result = await fetchData({
      method: "get",

      url: "/v2/pweb/home",
    });
    // 数据测试
    // console.log(result.daily_topics.topics);
    setbannerslist([...bannerslist, ...result.banners]);
    setcategories([...categories, ...result.categories]);
    setdiscovery_modules([
      ...discovery_modules,
      ...result.discovery_modules[0].topics,
    ]);
    setdaily_topics([...daily_topics, ...result.daily_topics.topics]);
    setdays([...days, ...result.daily_topics.week_days]);
  };
  const GetYCList = async (data) => {
    let result = await fetchData({
      method: "get",
      url: `/v2/pweb/ugc/${data}`,
    });
    data == "rec_topics" ? (result = result.topics) : (result = result.list);
    // console.log(result, "xxxx");
    setYClist([YClist, ...result]);
  };
  // console.log(daily_topics,'123')
  const GetbookDetail = async (data) => {
    let result = await fetchData({
      method: "get",
      url: `/v2/pweb/topic/${data} `,
    });
    console.log(result.topic_info, "123456");
  };
  const GetupdateList = async (data) => {
    let result = await fetchData({
      method: "get",
      url: `/v2/pweb/daily/topics?pos=${data} `,
    });
    console.log(result.topics);
    setdaily_topics(result.topics);
  };
  useEffect(() => {
    GetHomelist();
    GetYCList("rec_topics");
  }, []);
  // console.log(discovery_modules, "111");
  const items = bannerslist.map((item, index) => (
    <Swiper.Item
      key={index}
      onClick={() => {
        console.log(item.target_id);
        navigate(`/ycdetail?${item.target_id}`);
      }}
    >
      <Image src={item.image_url} fit="fill" />


    </Swiper.Item>
  ));

  function Follow(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return (
        <Button
          onClick={(e) => {
            setisLoggedIn(!isLoggedIn);
            console.log(e);
          }}
        >
          1
        </Button>
      );
    } else
      return (
        <Button
          onClick={() => {
            setisLoggedIn(!isLoggedIn);
            console.log(isLoggedIn);
          }}
        >
          2
        </Button>
      );
  }

  return (
    <div className="container">
      <div className="top">
        <Swiper
          slideSize={70}
          trackOffset={15}
          loop
          stuckAtBoundary={false}
          autoplay={true}
        >
          {items}
        </Swiper>
        <CapsuleTabs
          defaultActiveKey="1"
          onChange={(key) => {
            console.log(key);
          }}
        >
          <CapsuleTabs.Tab title="全部" key="1" />
          {categories.map((item) => (
            <CapsuleTabs.Tab title={item.title} key={item.tagId} />
          ))}
        </CapsuleTabs>
      </div>
      <div className="YC">
        <div className="YC_header">
          <Grid columns={4}>
            <Grid.Item span={1}>
              <div style={{ fontSize: 16 }}>原创投稿</div>
            </Grid.Item>
            <Grid.Item span={1}>
              <div
                onClick={() => {
                  GetYCList("rec_topics");
                  seisActiv(0);
                  console.log(isActive, "原创");
                }}
                style={{
                  color: isActive == 0 ? " var(--adm-color-warning)" : "black",
                }}
              >
                推荐编辑
              </div>
            </Grid.Item>
            <Grid.Item span={1}>
              <div
                onClick={() => {
                  GetYCList("topics");
                  seisActiv(1);
                  console.log(isActive, "最新上架");
                }}
                style={{
                  color: isActive == 1 ? " var(--adm-color-warning)" : "black",
                }}
              >
                最新上架
              </div>
            </Grid.Item>
            <Grid.Item span={1}>
              <button>更多</button>
            </Grid.Item>
          </Grid>
        </div>
        <div className="YC_body">
          {YClist.slice(1, 7).map((item, index) => (
            <div key={index} className="YC_body_item">
              <Image src={item.cover_image_url} fit="cover" />
              <div>{item.title}</div>
              <div className="imgfooter">
                <div className="nickname">{item.user.nickname}</div>
                <div className="likes_count">{item.likes_count}</div>
              </div>
              {/* <ul>
                {item.tags.map((tagsitem,tagsindex)=>(
                  <li>{tagsitem}</li>
                ))}
              </ul> */}
            </div>
          ))}
        </div>
      </div>
      <DU
        daily_topics={daily_topics}
        days={days}
        GetupdateList={GetupdateList}
      ></DU>
      <div className="ST">
        <div className="ST_header">这漫画令我上头！</div>
        <div className="ST_body">
          {discovery_modules.map((item, index) => (
            <div className="ST_body_item" key={index}>
              <div className="ST_body_item_header">
                <div className="ST_body_item_header_title">{item.title}</div>
                {/* 按钮 */}
                <Follow isLoggedIn={isLoggedIn}></Follow>
                <div style={{ color: "orange", fontSize: 26, marginLeft: "70%", float: "left" }} onClick={() => addcollection(discovery_modules, index)}>
                  <HeartFill />
                </div>
              </div>
              <Space>
                {item.tags.map((tagsitem, tagsindex) => (
                  <Tag round color="lightgray" key={tagsindex}>
                    {tagsitem}
                  </Tag>
                ))}
                <Tag round color="lightgray">
                  {item.update_remind}
                </Tag>
              </Space>

              <Image src={item.cover_image_url} fit="cover" />
              <div className="ST_body_item_footer">
                <div className="nickname">{item.user.nickname}</div>
                <div className="likes_count">
                  {" "}
                  <EyeInvisibleOutline />
                  {item.likes_count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <CL></CL> */}
    </div>
  );
};

export default Find;
