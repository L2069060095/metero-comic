import React, { useState } from "react";

//两个都是react-redux的钩子函数
import { useSelector, useDispatch } from 'react-redux'

//之前counterSlice导出的方法就直接用在组件上 直接引入指定切片中定义的方法
import { delhistory,addCollection, delCollection,addCaricature,delCaricature} from "../../redux/ws/slice"

function World() {

  // 通过useSelector钩子函数，来获取store中指定切片中的数据  就相当于vuex中的mapState函数
  const userdatas = useSelector((store: any) => store.ws_userdatas.userdatas)
  // 通过dispatch钩子函数，传入切片中定义的方法，进行数据的操控
  const dispatch = useDispatch()

  const delhistory1:any=()=>{
    // console.log(userdatas[0].history.payload.newhistory[0].id)
    dispatch(delhistory({type:"ws_userdatas/delhistory",id:userdatas[0].history.payload.newhistory[0].id}))
  }

  const addcollection:any=()=>{
    dispatch(addCollection({type:"ws_userdatas/addCollection",newcollection:[{id:"222",title:"漫画名---addcollection",vertiacl_img_url:"漫画封面图片"}]}))
  }

  const delcollection:any=()=>{
    console.log(userdatas[0].collection.payload.newcollection[0].id)
    dispatch(delCollection({type:"ws_userdatas/delCollection",id:"111"}))
  }

  const addcaricature:any=()=>{
    dispatch(addCaricature({type:"ws_userdatas/addCaricature",newcaricature:[{id:"444",title:"漫画名---newcaricature",vertiacl_img_url:"漫画封面图片"}]}))
  }

  const delcaricature:any=()=>{
    console.log(userdatas[0].caricature.payload.newcaricature[0].id)
    dispatch(delCaricature({type:"ws_userdatas/delCaricature",id:"444"}))
  }

  return <div>世界
    <button onClick={delhistory1}>delhistory</button>
    <button onClick={addcollection}>addcollection</button>
    <button onClick={delcollection}>delcollection</button>
    <button onClick={addcaricature}>addcaricature</button>
    <button onClick={delcaricature}>delcaricature</button>
  </div>;
}

export default World;
