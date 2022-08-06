import React, { FC } from "react";
import "./ceshi.scss"
import { NoticeBar } from "antd-mobile"

export const Ceshi: FC = () => {
    const demoLongText = "........>_< ........操作受限，请先登录! ........>_<........."

    return <div className="box">
        <NoticeBar content={demoLongText} color='alert' speed={100} delay={20} style={{ "--height": "50px", "--font-size": "18px" }} />
    </div>
}