import React, { FC ,useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import { Image,NavBar,Toast } from 'antd-mobile'
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './index.scss'
const BD: FC = () => {
  const navigate=useNavigate()
  let [searchParams, setSearchParams] = useSearchParams();
  const detail_id = searchParams.get("id");
  const { loading: loading3, fetchData } = useFetch<any>({}, false);
  let[booklist,setbooklist]=useState([])
  let[title,settitle]=useState([])
  const GetBookDetail = async () => {
    let result = await fetchData({
      method: "get",
      url: `/v2/pweb/comic/${detail_id}`,
    });
    console.log(result.comic_info)
    settitle(result.comic_info.title)
    setbooklist(result.comic_info.comic_images)
  };
  useEffect(() => {
    GetBookDetail()
  }, []);
  const back = () =>{
    navigate(-1)
  }

  return (
  <div className="BK">
     <NavBar onBack={back}>{title}</NavBar>
    {booklist.map((item,index)=>(
         <Image src={item.url} key={index} lazy/>
    ))}
  </div>
    
  );
};

export default BD;
