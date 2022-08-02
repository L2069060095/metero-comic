import React, { FC } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch2 from "../../../hooks/useFetch2";
import { Image, NavBar } from 'antd-mobile'
import { useNavigate } from "react-router";
import "./index.scss"



const Slist: FC = () => {
    const navigate = useNavigate()

    let [searchParams, setSearchParams] = useSearchParams();
    const bookName = searchParams.get("q")

    const { loading: bookLoading, data: bookData } = useFetch2({
        // https://m.kuaikanmanhua.com/search/mini/hot_word?&page=2&size=10
        // https://m.kuaikanmanhua.com/
        // https://www.kuaikanmanhua.com//v2/pweb/comic/353105 
        url: `/test/search/mini/topic/title_and_author?page=1&size=20&q=${bookName}`,
        method: "GET",

    })
    // console.log('77777777777 ', bookData);

    return (<div>
        {bookData && (<div className="page">
            <NavBar onBack={() => navigate(-1)}></NavBar>
            {/* {JSON.stringify(bookData)} */}
            <div className="result">搜索结果</div>
            {bookData.map((item: any) => <div key={item.id} className="bookitem">
                <Image src={item.vertical_image_url} fit='fill' width={320} height={424}
                    style={{ borderRadius: 10 }} className="img" onClick={() => { navigate(`/detail?id=${item.id}`) }}></Image>
                {item.category.map((style: any, idx: any) => <span key={idx}>{style}</span>)}
                <p className="title">{item.title}</p>
                <div className="author">{item.author_name}</div>

            </div>)}

        </div>)}

    </div>)
}

export default Slist;