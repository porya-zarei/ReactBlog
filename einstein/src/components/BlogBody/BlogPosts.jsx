import { Link } from "react-router-dom";
import { CDNImage } from "../../services/config.json";
import PropTypes from 'prop-types';
import isEmpty from "lodash/isEmpty";

const BlogPosts = ({ filteredPosts }) => {

    console.log("blogposts => ",filteredPosts);
    const getCutedDescribe = (desc) => {
        getCutedDescribe.propTypes = {
            desc: PropTypes.string.isRequired
        }
        if (desc.length < 140) {
            return desc
        } else {
            desc = desc.slice(0, 140) + " ...";
            return desc;
        }
    }

    return (
        isEmpty(filteredPosts) ? null :
            (
                filteredPosts.map(post => (
                    <div className="card col-md-3 col-sm-12 p-1 border-0 shadow">

                        <img loading="lazy" className="card-img card-img-top post-img" width="100%" height="200" src={`${CDNImage}/${post.ImageName}`} alt={`${post.ImageName}`} />
                        <div className="card-body rounded-bottom bg-creemy mt-1">
                            <h4 className="card-title">{post.Title}</h4>
                            <p className="card-text h-100px overflow-hidden">{getCutedDescribe(post.ShortDescription)}</p>
                            <Link to={`/single/${post.PostID}`} className="btn btn-primary anim-wobble-hover"> ادامه</Link>
                        </div>
                        <div className="card-footer bg-light d-flex">
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
                        </div>
                    </div>
                ))
            )
    );
}

export default BlogPosts;