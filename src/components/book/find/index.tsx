import React, { useState,useEffect } from "react";
import { Button, Space, Swiper, Toast } from "antd-mobile";
import styles from "./index.module.scss";
import useFetch from "../../../hooks/useFetch";

export default function Find() {
  const colors = ["#ace0ff", "#bcffbd", "#e4fabd", "#ffcfac"];
  // 轮播图数据
  let [bannerslist, setbannerslist] = useState([]);
  //分类导航数据
  let [categories, setcategories] = useState([]);
  //每日更新数据
  let [daily_topics, setdaily_topics] = useState([]);
  //飙升榜数据
  let [discovery_modules, setdiscovery_modules] = useState([]);
  let [popularity_topics, setpopularity_topics] = useState([]);
  let [ranks, setranks] = useState([]);
  let [rec_topics, setrec_topics] = useState([]);
  let [ugc_topics, setugc_topics] = useState([]);
  const { loading: loading3, fetchData } = useFetch<any>({},false);
  const GetHomelist=async()=>{
    let result=await fetchData({
      method: "get",
      url: '/api/v2/pweb/home',
    })
    console.log(result)
  }
  
  useEffect(()=>{
    GetHomelist()
  },[])
  const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
      <div className={styles.content} style={{ background: color }}>
        {index + 1}
      </div>
    </Swiper.Item>
  ));

  return (
    <div>
      <Swiper slideSize={70} trackOffset={15} loop stuckAtBoundary={false}>
        {items}
      </Swiper>
    </div>
  );
}
