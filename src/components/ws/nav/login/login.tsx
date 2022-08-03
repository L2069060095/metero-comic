import { FC, useState, } from "react";
import { Button, Form, Input, Image, Modal, SpinLoading, Mask } from 'antd-mobile'
import { useNavigate } from "react-router";
import Nav2 from "../../nav2/nav2"
import axios from "axios"
import md5 from "md5"

//两个都是react-redux的钩子函数
import { useSelector, useDispatch } from 'react-redux'

//之前counterSlice导出的方法就直接用在组件上 直接引入指定切片中定义的方法
import { adduser, deluser ,addhistory,addCaricature} from "../../../../redux/ws/slice"


const Login: FC = () => {

    const navigate = useNavigate()

    // 通过useSelector钩子函数，来获取store中指定切片中的数据  就相当于vuex中的mapState函数
    const userdatas = useSelector((store: any) => store.ws_userdatas.userdatas)
    // 通过dispatch钩子函数，传入切片中定义的方法，进行数据的操控
    const dispatch = useDispatch()

    //获取数据
    const getdata: any = async (values: any) => {
        console.log(values)
        // MD5 加密
        let key = "ws021227"
        values.password = md5(values.password + key)
        let result: any = await axios.post("http://localhost:3000/api/login", {
            paramsObj: values
        })
        console.log(result)//返回当前的登录数据，包括登录的提示信息，和当前登录的用户信息
        // 提示成功与否
        setTimeout(() => {
            if (result.data.code == 666) {
                dispatch(adduser({type:"ws_userdatas/adduser",newuser:result.data.userdata}))//存储到分片中
                dispatch(addCaricature({type:"ws_userdatas/addCaricature",newcaricature:result.data.userdata.caricature}))
                Modal.show({
                    content: result.data.text + "自动跳转页面！",
                    showCloseButton: true,
                })
                setTimeout(() => {
                    navigate("/")
                    Modal.clear()
                }, 1000)
            } else {
                Modal.show({
                    content: result.data.text,
                    showCloseButton: true,
                })
            }
        }, 500)
    }

    // 图片地址
    const [img, setimg] = useState(true)

    //遮罩
    // const [visible, setVisible] = useState(false)

    // 表单提交事件
    const onFinish = (values: any) => {
        // axios发送数据到后台
        getdata(values)
    }

    // tologin
    // const tologin = () => {
    //     setVisible(true)
    //     setTimeout(() => {
    //         setVisible(false)
    //     }, 600)
    //     navigate("/login")
    // }

    return <div>
        {/* 遮罩 */}
        {/* <Mask visible={visible} onMaskClick={() => setVisible(false)}>
            <SpinLoading color="orange" style={{marginTop:"25%",marginLeft:"49%"}}></SpinLoading>
        </Mask> */}
        <Nav2></Nav2>
        <div style={{ width: "80%", height: "50%", float: "left", marginLeft: "10%", marginTop: "25%", backgroundColor: "#fff", borderRadius: "10%" }}>
            <Image className="img" style={{ width: "25%", height: "25%", marginLeft: "40%", marginBottom: "12%" }} src="https://cdn.imgcn.top/20191017/e04d24c194da5f799b4f82a3acab5261.jpg!logo"></Image>
            <Form
                layout='vertical'
                onFinish={onFinish}
                style={{ width: "50%", marginLeft: "15%" }}
                className="from"
            >
                <Form.Item
                    name='username'
                    label='用户名'
                    rules={[{ required: true, message: '用户名不能为空' }]}
                    style={{ height: '8%', fontSize: "14px" }}
                >
                    <Input id="ipt1" min={6} max={12} placeholder='请输入用户名' clearable style={{ "--font-size": "2px" }} />
                </Form.Item>
                <Form.Item
                    name='password'
                    label='密码'
                    rules={[{ required: true, message: '密码不能为空' }]}
                    style={{ height: '8%', fontSize: "14px" }}
                >
                    <Input id="ipt" min={6} max={12} placeholder='请输入密码' type="password" style={{ "--font-size": "4px" }} clearable onFocus={() => setimg(!img)} onBlur={() => setimg(!img)} />
                </Form.Item>

                <Button block type='submit' color='warning' style={{ width: "50%", height: "300%", marginLeft: "50%", marginBottom: "10%", padding: "2%", marginTop: "20%" }} loading="auto" >
                    <p style={{ fontSize: "15px", margin: "0px" }}>GO</p>
                </Button>
                <a href="/zhuce" style={{ marginLeft: "50%", fontSize: "14px", color: "#666" }} >注册账号？</a>
            </Form>

            {img && <Image src={"https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login/img/22_open.72c00877.png"} style={{ width: "25%", marginTop: "-22%", borderRadius: "10%" }}></Image>}
            {!img && <Image src={"https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login/img/22_close.0efad8c4.png"} style={{ width: "25%", marginTop: "-22%", borderRadius: "10%" }} lazy></Image>}
        </div>
    </div >
}

export default Login

