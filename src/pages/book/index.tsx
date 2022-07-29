import React from "react";
import { NavBar, Tabs, Button } from "antd-mobile";
import "./index.scss";
import Find from "../../components/book/find";
function Book() {
  return (
    <div>
      <Tabs>
        <Tabs.Tab title="发现1111" key="find">
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
