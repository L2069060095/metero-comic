import React,{FC} from "react";
import { NavBar, Tabs, Button } from "antd-mobile";
import "./index.scss";
import Find from "../../components/book/find";
import { useNavigate } from "react-router";
const Book: FC =()=> {
  const navigate = useNavigate()

  return (
    <div>
      <Tabs>
        <Tabs.Tab title="发现" key="find">
          <Find></Find>
        </Tabs.Tab>
        <Tabs.Tab title="热门" key="hot">
          <button onClick={()=>{
            navigate("/Ranking")
          }} >跳转详情</button>
        </Tabs.Tab>
        <Tabs.Tab title="关注" key="follow">
          关注
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

export default Book;
