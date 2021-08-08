import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { newsData } from "../../recoil/atoms/newsData";
import { getData } from "../../services/newsData";


const Banner = () => {

    const [articles, setArticles] = useRecoilState(newsData);
    console.log("articles => ",articles);
    // var articles = [];
    const defaultImage =
        (
            <svg className="" width="100%" height="100%"
                xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false"
                role="img" aria-label="Placeholder: no Image">
                <title>this news dont have image</title>
                <rect width="100%" height="100%" fill="#55595c"></rect><text x="80%" y="50%" fill="#eceeef"
                    dy=".3em">no Image</text>
            </svg>
        );
    useEffect(() => {
        getData("programing", 17)
            .then(res => res)
            .then(result => {
                console.log("arrrr => ",result);
                if(!result.includes("Error")){
                    console.log("arrrr not error => ", result.includes("Error"), result);
                    setArticles(result);
                }
                    
            })
            .catch(err => {
                console.log("error in get data from other api =>", err);
                setArticles([]);
            });
        console.log("new data =>", articles);
    }, []);
    return (
        <>
            <div className="banner text-center rounded p-1 row m-auto overflow-hidden">
                <div className="col-12">
                    <div className="row">
                        {!isEmpty((articles)) ?
                            articles?.map(article => (
                                <div className="col-md-4 w-50 col-sm-12 col-lg-4 bg-secondary overflow-hidden rounded-3 my-1">
                                    <div className="row h-100">

                                        <div className="col-8 card rounded-0 p-0">
                                            <div className="card-header">
                                                <div className="row justify-content-between align-items-center font-mini-2">
                                                    <div className="col-3 d-inline-flex">
                                                        US
                                                    </div>
                                                    <div className="col-3 d-inline-flex text-center badge text-info">
                                                        Newss
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="card-body overflow-hidden">
                                                <div className="card-text font-mini-2">
                                                    {article.title}
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="row justify-content-between align-items-center">
                                                    <div className="col-3 font-mini-3 d-inline-flex">
                                                        <a className="text-decoration-none" href={article.url} target="_blank" rel="noreferrer">
                                                            ...more
                                                </a>
                                                    </div>
                                                    <div className="col-6 font-mini-3 d-inline-flex">
                                                        {article.author ? article.author : article.publishedAt}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4 bg-warning m-0 p-0">
                                            {
                                                article.urlToImage !== null ?
                                                    <img src={(article.urlToImage)} className="news-img-filter" height="100%" width="100%" alt="news" />
                                                    :
                                                    defaultImage
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                            : <div> News ... </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;