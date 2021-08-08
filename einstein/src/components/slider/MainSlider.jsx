import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CDNImage } from "../../services/config.json";
import GoodImage from "../GoodImage/GoodImage";

const MainSlider = ({ posts }) => {
    const [sliderPosts, setSliderPosts] = useState([]);
    const setSliders = (posts) => {
        setSliderPosts(posts.filter(p => p.ShowInSlider));
    }
    useEffect(() => { setSliders(posts); }, [posts]);
    return (
        <div id="my-slider" className="carousel slide" data-ride="carousel" data-bs-ride="carousel">
            <ol id="sliderol" className="carousel-indicators">
                {sliderPosts.map((post, i) => (
                    <li data-bs-target="#my-slider" data-bs-slide-to={i} className={`${i === 0 ? "active" : null}`}></li>
                ))}
            </ol>
            <div id="sliderinner" className="carousel-inner" role="listbox">

                {sliderPosts.map((post, i) => (
                    <div
                        key={i} id={`carouselId${i}`}
                        className={`carousel-item carousel-item-next carousel-item-start ${i === 0 ? "active" : null}`}
                    >

                        <img className="card-img slider-img"
                            src={`${CDNImage}/${post.ImageName}`}
                            width="100%" height="500px" alt={`sl${i}`}
                        />
                        <div className="carousel-caption text-right alert slider-body text-white rounded">
                            <div className="m-1">{post.Title}</div>
                            <p className="m-1 mr-5 p-1">{post.ShortDescription}</p>
                            <Link to={`/single/${post.PostID}`} className="btn btn-primary">ادامه</Link>
                        </div>
                    </div>
                    
                ))}

            </div>

            <a className="carousel-control-prev" href="#my-slider" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </a>
            <a className="carousel-control-next" href="#my-slider" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </a>
        </div>
    );
}

export default MainSlider;