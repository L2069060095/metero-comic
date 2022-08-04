import { type } from "@testing-library/user-event/dist/type";
import { Divider } from "antd-mobile";
import { Swiper, Image, Popover } from "antd-mobile";
import React, { FC } from "react";
import "./index.scss";
import { useState ,} from "react";
import { AntOutline } from 'antd-mobile-icons'
import { useNavigate } from "react-router";

const DU: FC<any> = (props) => {
  let [currentIndex,setcurrentIndex]=useState(0)
  const navigate=useNavigate()
  return (
    <div className="DU">
      {/* {JSON.stringify(props.daily_topics)} */}
      <div className="DU_header">
        <div className="DU_header_title">每日更新</div>
        <ul>
          {props.days.map((item, index) => (
            <li style={{
              borderBottom: currentIndex == index ? " 2px solid var(--adm-color-warning)" : "0px",
            }}
              key={index}
              onClick={() => {
                props.GetupdateList(index);
                console.log(props.daily_topics,'xxxx')
                setcurrentIndex(index)
                // console.log(index);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="DU_body">
        <Swiper
          direction="vertical"
          trackOffset={10}
          slideSize={90}
          stuckAtBoundary={false}
          style={{ "--height": "200px" }}
          indicator={() => null}
          autoplay
        >
          {props.daily_topics.map((item, index) => (
            <Swiper.Item key={index} onClick={()=>{
              console.log(item)
              navigate(`/detail?id=${item.id}`)
            }}>
              <Image src={item.cover_image_url} fit="cover"></Image>
              <div className="likes_count"><AntOutline />{item.likes_count}</div>
              {/* <div className="tags">{item.tags}</div> */}
              <div className="title">《{item.title}》</div>
              {/* <div className="nickname">{item.user.nickname}</div> */}
            </Swiper.Item>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DU;
