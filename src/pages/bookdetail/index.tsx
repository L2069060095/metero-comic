import React, { FC ,useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import { Image} from 'antd-mobile'
import { useSearchParams } from "react-router-dom";
const BD: FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const detail_id = searchParams.get("id");
  const { loading: loading3, fetchData } = useFetch<any>({}, false);
  let[booklist,setbooklist]=useState([])
  const GetBookDetail = async () => {
    let result = await fetchData({
      method: "get",
      url: `/v2/pweb/comic/${detail_id}`,
    });
    console.log(result.comic_info.comic_images)
    setbooklist(result.comic_info.comic_images)
  };
  useEffect(() => {
    GetBookDetail()
  }, []);
  return (
  <div>
    {booklist.map((item,index)=>(
         <Image src={item.url} key={index} lazy/>
    ))}
  </div>
    
  );
};

export default BD;
