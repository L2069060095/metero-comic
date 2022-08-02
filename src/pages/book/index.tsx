import React from "react";
import { NavBar, Tabs, Button, Toast, Space } from "antd-mobile";
import "./index.scss";
import Find from "../../components/book/find";

import { SearchOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router";


function Book() {

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
          热门
        </Tabs.Tab>
        <Tabs.Tab title="关注" key="follow">
          关注
        </Tabs.Tab>



      </Tabs>
    </div>
  );
}

export default Book;
