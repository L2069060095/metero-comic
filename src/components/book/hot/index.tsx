import React, { useState, useEffect, FC } from "react";
import { Button, Ellipsis, Image, List, Tabs, Badge } from "antd-mobile";
import styles from "./index.module.scss";

import "./index.scss";
import { useNavigate  } from "react-router-dom";
import {
  StarOutlined,
  MinusOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

const Hot: FC<any> = (props) => {
  let navigate = useNavigate();
  const [id1, setid1] = useState(7);
  const [id2, setid2] = useState(7);
  const color1 = id1 == 7 ? "#800000" : id1 == 11 ? "#004d00" : "#804000";
  const color2 = id1 == 7 ? "#4d0000" : id1 == 11 ? "#003300" : "#4d2600";
  console.log(id2);
 
  

 
  return (
    <div className={styles.all}>
      <Tabs
        onChange={(id: any) => {
          setid1(id);
        }}
        style={{ backgroundColor: color1 }}
        className={styles.tab}
      >
        {props.list.ranks.map((item: any) => (
          <Tabs.Tab
            title={item.title}
            key={item.rank_id}
            className={styles.tab1}
          >
            <Button fill="outline" className={styles.btn}>
              更多榜单
            </Button>
            {item.topics.map((item1: any, index: any) => (
              <List key={index}>
                <List.Item
                  onClick={()=>navigate('/test',{ state: { name: 'item1.id' } })}
                  style={{ backgroundColor: color2 }}
                  className={styles.tabs}
                  prefix={
                    <Image
                      src={item1.vertical_image_url}
                      width={100}
                      height={100}
                      fit="cover"
                      style={{ borderRadius: 4 }}
                    />
                  }
                  title={
                    <div>
                      <div className={styles.top}>TOP.{index + 1}</div>

                      <div className={styles.top1}>
                        {item1.rank_change_type === 2 ? (
                          <ArrowUpOutlined
                            style={{ color: "rgb(255, 80, 80)" }}
                          />
                        ) : item1.rank_change_type === 3 ? (
                          <ArrowDownOutlined
                            style={{ color: "rgb(0, 204, 102)" }}
                          />
                        ) : (
                          <MinusOutlined style={{ color: "white" }} />
                        )}{" "}
                        {item1.rank_change_value}
                      </div>
                    </div>
                  }
                  description={
                    <div>
                      <div className={styles.tit}> {item1.title}</div>

                      <Ellipsis
                        direction="end"
                        content={item1.user.nickname}
                        className={styles.tit1}
                      />
                      <Ellipsis
                        direction="end"
                        content={item1.description}
                        className={styles.tit1}
                      />
                    </div>
                  }
                ></List.Item>
              </List>
            ))}
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  );
};
export default Hot;
// export default () => {
//   let [bangdan, setbangdan] = useState<any>([]);
//   const { loading: loading3, fetchData } = useFetch<any>({}, false);
//   const GetHomelist = async () => {
//     let result = await fetchData({
//       method: "get",
//       url: "/v2/pweb/home",
//     });

//     console.log(result.ranks, "xxxxxxx");
//     setbangdan([...bangdan, ...result.ranks]);
//   };
//   console.log(bangdan,111);

//   const items = bangdan.map((bangdan:any) => {
//     <Tabs.Tab title={bangdan.title} key={bangdan.rank_id}>
//       {/* {bangdan.rank_desc} */}
//     </Tabs.Tab>;
//   console.log(bangdan.rank_desc)

//   });
//  console.log(items,'ssss');

//   useEffect(() => {
//     GetHomelist();
//   }, []);

//   return (
//     <div>
//       <Tabs>
//         {bangdan.map((bangdan: any) => {
//             {bangdan.rank_desc}
//           // console.log(bangdan.rank_desc);
//         })}
//       </Tabs>
//       {bangdan.rank_desc}
//     </div>
//   );
// };
