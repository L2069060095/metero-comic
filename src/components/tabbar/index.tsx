import {TabBar } from "antd-mobile";
import React, { useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";

import {
  SmileOutline ,
  SmileFill,
  UserCircleOutline,
  AppOutline ,
  TeamFill,
  KoubeiFill
} from "antd-mobile-icons";

export default function KTab() {
  const [activeKey, setActiveKey] = useState("");
  const navigate = useNavigate();
  const tabs = [
    {
      key: "",
      title: "漫画",
      icon: (active: boolean) =>
        active ? <KoubeiFill color='var(--adm-color-warning)'/> : <AppOutline />,
    },
    {
      key: "world",
      title: "世界",
      icon: (active: boolean) =>
        active ? <SmileFill color='var(--adm-color-warning)'/> : <SmileOutline />,
    },
    {
      key: "me",
      title: "我的",
      icon: (active: boolean) =>
      active ? <TeamFill color='var(--adm-color-warning)'/> : <UserCircleOutline />
    },
  ];

  const tabChange = (select: string) => {
    setActiveKey(select);
    navigate(`/${select}`);
  };

  return (
    <TabBar activeKey={activeKey} onChange={(select) => tabChange(select)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
}
