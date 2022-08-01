import { useState, useCallback, useEffect } from "react";
import 'whatwg-fetch'
import 'es6-promise'

//params : {url:"",method:"",paramsObj:{}}
function useFetch<S = any>(params?: any, execute: boolean = true) {
    //请求状态        loading  
    //请求返回的数据   data
    //请求错误信息     error
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<S>();
    const [error, setError] = useState<any>(null);

    //请求方法
    const fetchData = useCallback(async (params: any) => {
        try {
            setLoading(true)
            setError(null)
            //将请求的参数转换为字符串
            const objstr = params.paramsObj ? obj2params(params.paramsObj) : "";
            let result: any;
            if (params.method.toUpperCase() === "GET") {
                const url = objstr ? `${params.url}?${objstr}` : params.url;
                result = await fetch(url, {
                    credentials: 'include',
                    method: 'get',
                    headers: {
                        'Accept': 'application/json, text/plain, */*'
                    },
                })
            }
            else if (params.method.toUpperCase() === "POST") {
                result = await fetch(params.url, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    credentials: 'include',
                    body: objstr
                })
            }
            if (result.ok === true) {
                const res = await result.json();
                setData(res.data)
                setLoading(false)
                return res.data;
            }
            else {
                throw new Error('数据加载失败！');
            }
        }
        catch (e) {
            console.log("出现错误了，异常是", e)
            setError(e);
        }
        finally{
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        execute && fetchData(params);
    }, [])
    return { loading, data, error, fetchData }
}


// {name:zhangsan,age:123} ---> name=zhangsan&age=123
function obj2params(obj: any) {
    var result = '';
    var item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item]);
    }
    if (result) {
        result = result.slice(1);
    }
    return result;
}


export default useFetch;