import { FC, useState, } from "react";
import { Button, Form, Input, Image, Modal, ImageUploader } from 'antd-mobile'
import { useNavigate } from "react-router";
import Nav2 from "../../../nav2/nav2"
import axios from "axios"
import md5 from "md5"


const Login: FC = () => {
    const navigate=useNavigate()

    // 图片上传
    const [fileList, setFileList] = useState<any>([
        {
            url: "",
        },
    ])
    async function mockUpload(file: File) {
        return {
            url: URL.createObjectURL(file),
        }
    }

    //获取数据
    const getdata: any = async (values: any) => {
        console.log(values)
        // MD5 加密
        let key = "ws021227"
        values.password = md5(values.password + key)
        let result: any = await axios.post("http://localhost:3000/api/zhuce", {
            paramsObj: values
        })
        console.log(result)
        // 提示成功与否
        setTimeout(() => {
            if(result.data.code==666){
                Modal.show({
                    content: result.data.text+"自动跳转页面！",
                    showCloseButton: true,
                })
                setTimeout(()=>{
                    navigate("/login")
                    Modal.clear()
                },1000)
            }else{
                Modal.show({
                    content: result.data.text,
                    showCloseButton: true,
                })
            }
        }, 500)
    }

    // 图片地址
    const [img, setimg] = useState(true)

    // 表单提交事件
    const onFinish = (values: any) => {
        // axios发送数据到后台
        getdata(values)
    }

    return <div>
        <Nav2></Nav2>
        <div style={{ width: "40%", height: "50%", float: "left", marginLeft: "30%", marginTop: "6%", backgroundColor: "#fff", borderRadius: "10%", boxShadow: "inherit" }}>
           <Image className="img" style={{width:"20%",height:"20%",marginLeft:"40%",marginBottom:"8%"}} src="https://cdn.imgcn.top/20191017/e04d24c194da5f799b4f82a3acab5261.jpg!logo"></Image>
            <Form
                layout='horizontal'
                onFinish={onFinish}
                style={{ width: "55%", marginLeft: "25%" }}
                className="from"
            >
                <Form.Item
                    name='img'
                    label='狗头'
                    rules={[{ required: true, message: '头像不能为空' }]}
                    style={{ height: '8%',fontSize:"14px" }}
                >
                    <ImageUploader
                        value={fileList}
                        onChange={setFileList}
                        upload={mockUpload}
                        multiple={false}
                        maxCount={1}
                        style={{ "--cell-size": "60px" }}
                    />
                </Form.Item>
                <Form.Item
                    name='username'
                    label='用户名'
                    rules={[{ required: true, message: '用户名不能为空' }]}
                    style={{ height: '8%',fontSize:"14px" }}
                >
                    <Input id="ipt1" min={6} max={12} placeholder='请输入用户名' clearable style={{ "--font-size": "2px" }} />
                </Form.Item>
                <Form.Item
                    name='password'
                    label='密码'
                    rules={[{ required: true, message: '密码不能为空' }]}
                    style={{ height: '8%',fontSize:"14px" }}
                >
                    <Input id="ipt" min={6} max={12} placeholder='请输入密码' type="password" style={{ "--font-size": "4px" }} clearable onFocus={() => setimg(!img)} onBlur={() => setimg(!img)} />
                </Form.Item>

                <Button block type='submit' color='warning' style={{ width: "80%", height: "300%", marginLeft: "10%", marginBottom: "10%", padding: "2%", marginTop: "20%" }} loading="auto" onClick={() => {
                    new Promise((resolve, reject) => {
                        resolve("6")
                    })
                }}>
                    <p style={{ fontSize: "15px", margin: "0px" }}>GO</p>
                </Button>

            </Form>


            {img && <Image src={"https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login/img/22_open.72c00877.png"} style={{ width: "20%", marginTop: "-18%", borderRadius: "10%" }}></Image>}
            {!img && <Image src={"https://s1.hdslb.com/bfs/seed/jinkela/short/mini-login/img/22_close.0efad8c4.png"} style={{ width: "20%", marginTop: "-18%", borderRadius: "10%" }} lazy></Image>}
        </div>
    </div >
}

export default Login

