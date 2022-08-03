import 'whatwg-fetch'
import 'es6-promise'
export function fetchGet(url: string, params?: any) {
    const obj = params ? obj2params(params) : ""
    //fetch(请求url,请求的配置) ，会返回一个promise对象
    const result = fetch(`${url}?${obj}`, {
        /**
         * fetch不管在同域还是在跨域的情况下，默认都不携带cookie的，所以那些需要权限验证的请求就无法正常获取到数据，这时候需要配置credentials项，有一下三个选项可添：
               omit： 默认值，忽略cookie的发送
               same-origin： 表示cookie只能同域发送，不能跨域发送
               include： 表示既可以同域发送，也可以跨域发送
         */
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*'
        }
    })
    //promise.then()
    //response就是服务器响应的数据，对于服务器响应的数据，fetch提供了三种解析方案
    return result.then((response) => {
        //1 json数据      用reponse.json()来解析   都会返回一个新的promise
        //2 xml格式文件   用response.text()来解析  都会返回一个新的promise
        //3 图片文件      用response.blob()来解析  都会返回一个新的promise
        return response.json();
    })
}

export function fetchPost(url: string, params?: any) {
    const obj = params ? obj2params(params) : ""
    const result = fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*'
        },
        credentials: 'include',
        body: obj
    })
    return result.then((response) => {
        return response.json();
    })
}

// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
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

export { }