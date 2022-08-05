import React from "react";
import { NavBar, Tabs, Button, Toast, Space } from "antd-mobile";
import "./index.scss";
import Find from "../../components/book/find";
import { SearchOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router";
import Hot from "../../components/book/hot/index";
import useFetch from "../../hooks/useFetch";
import FL from "../../components/book/follow";

//两个都是react-redux的钩子函数
import { useSelector, useDispatch } from 'react-redux'


function Book() {
  const { loading: hloading, data: hdata } = useFetch({
    url: "/v2/pweb/home",
    method: "GET",
    paramsObj: {},
  });

  const navigate = useNavigate();

  const userdatas = useSelector((store: any) => store.ws_userdatas.userdatas)


  // 判断是否存在history
  var historyflag = false
  var caricatureflag = false
  var collectionflag = false
  var payload = false
  for (const iterator in userdatas[0]) {
    if (iterator === "history") {
      historyflag = !historyflag
    } else if (iterator === "caricature") {
      caricatureflag = !caricatureflag
    } else if (iterator === "collection") {
      collectionflag = !collectionflag
    }
    else if (iterator === "payload") {
      payload = !payload
    }
  }

  // const navto = () => {
  //   navigate(`/search`);
  //   // console.log("111111");
  // };

  // const right = (
  //   <div style={{ fontSize: 24 }}>
  //     <Space style={{ "--gap": "16px" }}>
  //       <SearchOutline onClick={() => navto()} />
  //     </Space>
  //   </div>
  // );

  return (
    <div>
      {/* <NavBar
        right={right}
        back={null}
        style={{ background: "var(--adm-color-warning)", fontWeight: "700" }}
      >
        快看漫画
      </NavBar> */}
      {payload &&<div className="searchlogo" style={{ fontSize: 24 }}>
        <Space style={{ "--gap": "16px" }}>
          <SearchOutline onClick={() => navigate(`/search`)} />
        </Space>
      </div>}
      <Tabs defaultActiveKey='find'>
        {!payload && <Tabs.Tab title="请先登录欧！" key="find">
          <Find></Find>
        </Tabs.Tab>}

        {payload && <Tabs.Tab title="发现" key="find">
          <Find></Find>
        </Tabs.Tab>}
        {payload && <Tabs.Tab title="热门" key="hot">
          {!hloading && <Hot list={hdata}></Hot>}
        </Tabs.Tab>}
        {payload && <Tabs.Tab title="关注" key="follow" >
          <FL></FL>
        </Tabs.Tab>}
      </Tabs>
    </div>
  );
}

export default Book;
