import React from "react";
import { useEffect } from "react";

import useFetch from "../../hooks/useFetch";

function Me() {

    const { fetchData, loading: cloading } = useFetch<any>({}, false);

    const getdata = async () => {
        let result = await fetchData({
            url: "/v2/pweb/home",
            method: "get"
        })
        console.log(result)
    }

    useEffect(() => {
        getdata()
    }, [])

    return (
        <div>我的</div>
    )
}

export default Me