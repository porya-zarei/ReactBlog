import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ChatDialog from '../dialogs/ChatDialog';
import { getAllPosts } from '../../redux/action/posts';
import random from 'lodash/random';
import isEmpty from 'lodash/isEmpty';
import localForage from "localforage";
import { ScaleLoader } from "react-spinners";
import { Parallax } from 'react-parallax';
import RightBody from './RightBody';
import MainSlider from '../slider/MainSlider';
import { Suspense, lazy } from 'react';
import LastPosts from './LastPosts';
import TopParallaxContent from './TopParallaxContent';

const Main = () => {

    var posts = (useSelector(state => state.posts));// || localForage.getItem("posts").then(posts => posts));
    console.log("postsssssssssss=>", posts);
    const dispatch = useDispatch();
    const loading = (
        <div className="row justify-content-center text-center mt-5">
            <ScaleLoader className="col-12" color="#0000ff" />
            <Link className="btn btn-info col-12 w-auto" to="/portfolio" >
                بابت مشکل ایجاد شده متاسفم از صفحه "درباره من" دیدن کنید
            </Link>
        </div>
    );
    // const [date] = useState(Date(Date.now).substr(0, 25));

    const imagesForTop = ["./images/nasa-earth.jpg", "./images/space1.webp"];
    const topImageSource = "./images/nasa-earth.jpg";// imagesForTop[random(0, imagesForTop.length - 1, false)];

    useEffect(() => {
        dispatch(getAllPosts());
        if (isEmpty(posts)) {
            localForage.getItem("posts").then(res => res).then(result => {
                posts = result;
            })
        }
    }, []);
    const Banner = lazy(() => import('../banner/Banner'));


    console.log(posts, "in main");

    //const sliderPosts = posts.filter(post => post.ShowInSlider === true);

    // console.log("Slider Posts => ", sliderPosts);

    return (
        <main id="body" className="h-100 bg-light col-md-12 m-0 p-0">
            <ChatDialog />

            <div className="card main-top-image text-white m-0 p-0">
                <Parallax
                    blur={0}
                    bgImage={topImageSource}
                    bgImageAlt="the cat"
                    strength={600}
                >
                    <TopParallaxContent />
                </Parallax>
            </div>

            <div className="p-1 mb-2 col-12">
                <MainSlider posts={posts} />
            </div>

            <div className="p-3 mb-2 col-12 h-100">
                <Suspense fallback={loading}>
                    <Banner />
                </Suspense>
            </div>

            <div className="m-0 main-body bg-light">

                <RightBody />

                <div id="left-b" className="bg-white left-body card border-0 p-3">

                    <div className="card-header card-title bg-secondary text-white display-6"> اخرین پست ها </div>

                    <div className="row card-body w-100 m-auto p-0 gap-1 justify-content-center align-items-start">

                        {(!isEmpty(posts)) ?
                            <LastPosts posts={posts} />
                            : (
                                loading
                            )}


                    </div>

                </div>
            </div>
        </main>
    );
}

export default Main;