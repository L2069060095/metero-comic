import React, { FC, useEffect, useState } from "react";
import { Image } from 'antd-mobile'
import "./index.scss";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router";
const Card: FC<any> = (props) => {
  const navigate=useNavigate()
  const { loading: loading3, fetchData } = useFetch<any>({}, false);
  let [title, settitle] = useState('');
  let [image, setimage] = useState('');
  let [description, setdescription] = useState('')
  const GetbookDetail = async (data) => {
    let result = await fetchData({
      method: "get",
      url: `/v2/pweb/topic/${data} `,
    });
    settitle(result.topic_info.title)
    setimage(result.topic_info.cover_image_url)
    setdescription(result.topic_info.description)
  };
  useEffect(() => {
    GetbookDetail(props.item);
  });
  return <div className="Card" onClick={()=>{
    navigate(`/detail?id=${props.item}`)
    
  }}>
     <Image src={image} width={200} />
     <div className="Card_right">
        <div className="Card_title">{title}</div>
        <div className="Card_description">{description}</div>
     </div>
    </div>;
};

export default Card;
