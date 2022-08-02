import React from "react";
import { NavBar, Tabs, Button } from "antd-mobile";
import "./index.scss";
import Find from "../../components/book/find";
import Hot from "../../components/book/hot";
import useFetch from "../../hooks/useFetch";
function Book() {
  const { loading: hloading, data: hdata } = useFetch({
    url: "/v2/pweb/home",
    method: "GET",
    paramsObj: {},
  });
  return (
    <div>
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
