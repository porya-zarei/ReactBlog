import { Link } from "react-router-dom";
import { CDNImage } from "../../services/config.json";
import { sortWithTime } from "../../utils/sorting";

const LastPosts = ({ posts }) => {
    
    const lastPosts = sortWithTime(posts);
    console.log(" last posts => ", lastPosts);

    return (

        lastPosts.map(post => (
            <div key={post.PostID} className="card col-md-12 p-1 my-1 bg-creemy border-0 rounded-1rem">

                {/* <ParallaxBanner
                    className="card-img card-img-top post-img shadow-40p bg-transparent rounded-1rem"
                    layers={[
                        {
                            // image: `./images/postsimages/${post.ImageName}`,
                            image: `${CDNImage}/${post.ImageName}`,
                            amount: 0.3,
                        },
                    ]}
                    style={{
                        height: '400px',
                    }}
                ></ParallaxBanner> */}
                <img loading="lazy" src={`${CDNImage}/${post.ImageName}`} height="400px" alt={post.Title} className="card-img card-img-top post-img shadow-40p bg-transparent rounded-1rem" />
                <div to={`/single/${post.PostID}`} className="card-body bg-transparent mt-1">
                    <h4 className="card-title">{post.Title}</h4>
                    <p className="card-text">{post.ShortDescription}</p>
                    <div className="card-link">
                        <Link to={`/single/${post.PostID}`} className="btn btn-primary anim-wobble-hover"> ادامه</Link>
                    </div>
                </div>
                <div className="card-footer bg-transparent d-flex">
                    <div className="text-muted mx-2 my-1 eye-hover">
                        <i className="bi bi-eye eye-hover" aria-hidden="true"></i>
                        <span className="badge text-black-50">{post.Visit}</span>
                    </div>
                    <div className="text-muted mx-2 my-1 anim-heartbeat-hover">
                        <i className="bi bi-heart-fill red-progress" aria-hidden="true"></i>
                        <span className="badge text-black-50">{post.Like}</span>
                    </div>
                    <div className="text-muted mx-2 my-1">
                        <i className="bi bi-person-check" aria-hidden="true"></i>
                        <span className="badge text-black-50"> نویسنده :Admin </span>
                    </div>
                    <div className="text-muted mx-2 my-1 badge overflow-hidden hide-sm">
                        <i className="bi bi-calendar2-week-fill" aria-hidden="true"></i>
                        <span className="badge text-black-50">{post.CreateDate?.slice(0, 10)}</span>
                    </div>
                </div>

            </div>))
    );
}

export default LastPosts;