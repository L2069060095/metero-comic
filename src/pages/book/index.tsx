import React from "react";
import { NavBar, Tabs, Button, Toast, Space } from "antd-mobile";
import "./index.scss";
import Find from "../../components/book/find";
import { SearchOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router";
import Hot from "../../components/book/hot";
import useFetch from "../../hooks/useFetch";
  
function Book() {
  const { loading: hloading, data: hdata } = useFetch({
    url: "/v2/pweb/home",
    method: "GET",
    paramsObj: {},
  });

  const navigate = useNavigate();

  const navto = ()=>{
    navigate(`/search`)
    // console.log("111111");
    
  }

  const right = (

    <div style={{ fontSize: 24 }}>
      <Space style={{ '--gap': '16px' }}>
        <SearchOutline onClick={()=>navto()}/>
      </Space>
    </div>
  )


  return (
    <div>

      <NavBar right={right} back={null}>
        快看漫画
      </NavBar>

      <Tabs>
        <Tabs.Tab title="发现" key="find">
          <Find></Find>
        </Tabs.Tab>
        <Tabs.Tab title="热门" key="hot">
          {!hloading && <Hot list={hdata}></Hot>}
        </Tabs.Tab>
        <Tabs.Tab title="关注" key="follow">
          关注
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default Book;
