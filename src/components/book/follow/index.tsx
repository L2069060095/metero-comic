import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import Card from "../card";
import "./index.scss";

const FL: FC = () => {
  const idList = useSelector((store: any) => store.hl_userdatas.idlist);
  return (
    <div>
      {idList.map((item, index) => {
        return <Card item={item} key={index}></Card>;
      })}
    </div>
  );
};

export default FL;
