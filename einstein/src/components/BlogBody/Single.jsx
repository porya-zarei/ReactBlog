import isEmpty from 'lodash/isEmpty';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch, withRouter } from 'react-router';
import { getPostComments } from '../../redux/action/comments';
import { getSinglePost } from '../../redux/action/post';
import { getAllPosts } from '../../redux/action/posts';
import { addComment } from '../../services/commentServices';
import { CDNImage } from "../../services/config.json";
import { updateForLike, updateForVisit } from '../../services/postService';
import localForage from "localforage";


const Single = () => {
    // console.log(match)getPost(match.params.id).data;
    const match = useRouteMatch();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const posts = useSelector(state => state.posts) || localForage.getItem("posts");
    var post = useSelector(state => state.post) || (!isEmpty(posts) ? posts.filter(post => post.PostID === match.params.id) : null);
    const comments = useSelector(state => state.comments);
    console.log("cooments in post", comments);
    const postText = useRef();
    const likeBtn = useRef();
    const likeBtnI = useRef();
    const likeBtns = useRef();

    // useEffect(() => { dispatch(getSinglePost(match.params.id)); });
    useEffect(() => {
        setPostText().then(r => r).then(res => res);
    }, [post]);

    const handleOpenNewPost = async (addr,id) => {
        await history.push(addr);
        console.log("id in single => ", id);
        await dispatch(getSinglePost(id));
        // loading ------
        window.scrollTo({top:0});
    }

    const selectRelatedPosts = (allPosts, selectedPost) => {
        allPosts = allPosts.filter(p => p.PostID !== selectedPost.PostID);
        var related = allPosts.filter(p => {
            var inc = false;
            p.Tags.split(",").forEach(t => {
                selectedPost.Tags.split(",").forEach(tag => {
                    if (String(t) === String(tag)) {
                        inc = true;
                    }
                })
            })
            return inc;
        });
        if (related.length < 3) {
            related = allPosts.slice(0, 3);
        }
        console.log("related in single =>", related);
        related.length = 3;
        return related;
    }

    useEffect(() => {

        if (!isEmpty(user)) {
            setEmail(user.Email);
            setFullName(user.FullName);
        }
        dispatch(getAllPosts());
        dispatch(getSinglePost(match.params.id));
        dispatch(getPostComments(match.params.id));

        return (() => {
            updateForVisiting().then(res => res).then(res => {
                console.log("post updated => ", post);
            });
        });

    }, []);

    const setPostText = async () => {
        if (post.Text) {
            await (postText.current.innerHTML = post.Text);
        }

    }

    const updateForVisiting = async () => {
        await updateForVisit(match.params.id);
        dispatch(getAllPosts());
        dispatch(getSinglePost(match.params.id));
    }

    const liking = async (e) => {
        e.preventDefault();
        console.log("post in like => ", post);

        updateForLike(match.params.id).then(res => res).then(async result => {
            const { data, status } = result;
            if (data === true || status === 200) {
                dispatch(getAllPosts());
                dispatch(getSinglePost(match.params.id));
                dispatch(getPostComments(match.params.id));
                await likeBtnI.current.classList.add("like-btn-click");
                await likeBtn.current.classList.add("disabled");
                likeBtns.current.innerHTML = "You Liked";
            }
        });

    }

    console.log("Posts => ", posts, "Post ->", post);

    const handleSendComment = (id) => {

        const data = {
            "PostID": id,
            "Name": fullName,
            "Email": email,
            "Comment": text
        }

        addComment(data).then(r => r).then(({ data, status }) => {
            if (status === 201) {
                dispatch(getPostComments());
                setText("");
            }
        })

    }

    const searchInBlog = (tag) => {
        history.push(`/blog/?q=${tag}`, tag);
    }

    return (
        <main id="body" className="bg-body h-100 bg-light col-md-12 m-0 p-0">

            <div className="m-0 main-body">
                <div id="left-b" className="bg-white left-body card border-0">

                    {isEmpty(post) ? null : (
                        <div className="card-header align-items-center card-title bg-secondary text-white mt-5 row py-1">
                            <span className="col-sm-12 col-md-4 my-auto font-weight-bolder">{post.Title}</span>
                            <button ref={likeBtn} id="likebtn" className="btn btn-danger text-white m-auto col-sm-12 col-md-8 mt-2 like-btn my-1 rounded outline-none border-none" onClick={liking} >
                                <i ref={likeBtnI} id="likebtni" className="fa fa-heart-o mx-1 like-btn-i" aria-hidden="true"></i>
                                <span ref={likeBtns} id="likebtns" className="">like</span>
                            </button>

                        </div>
                    )}

                    <div className="row card-body p-0">


                        {isEmpty(post) ?
                            (
                                <div className="alert alert-dark text-white display-2">یافت نشد</div>
                            )
                            :
                            (
                                <div className="card row col-12 p-1 my-1 mx-auto border-0 shadow animate__animated animate__bounceInUp zooming-parent">

                                    <img className="card-img card-img-top post-img mt-1 zooming" width="100%" height="400" src={`${CDNImage}/${post.ImageName}`} alt={`${post.ImageName}`} />

                                    <div className="col-12 card-body rounded-bottom bg-light">
                                        <div ref={postText} className="card-text m-1 p-2" id="posttext">

                                        </div>

                                        <div className="text-muted mx-2 my-1 badge">
                                            <i className="bi bi-calendar-check" aria-hidden="true"></i>
                                            <span className="badge text-black-50">{post?.CreateDate?.slice(0, 10)}</span>
                                        </div>
                                        <div className="d-flex badge align-items-center" style={{ fontSize: 15 }}>
                                            <div className="text-muted mx-2 my-1">
                                                <i className="bi bi-eye-fill" aria-hidden="true"></i>
                                                <span className="badge text-black-50">{post.Visit}</span>
                                            </div>
                                            <div className="text-muted mx-2 my-1">
                                                <i className="bi bi-heart-fill" aria-hidden="true"></i>
                                                <span className="badge text-black-50">{post.Like}</span>
                                            </div>
                                            <div className="text-muted mx-2 my-1">
                                                <i className="bi bi-person-check-fill" aria-hidden="true"></i>
                                                <span className="badge text-black-50"> نویسنده : Admin </span>
                                            </div>
                                            <hr />
                                        </div>
                                        <ul className="text-white">
                                            {post?.Tags?.split(",")?.map((tag, i) => (
                                                <li className="badge" key={i}><button onClick={() => { searchInBlog(tag) }} className="btn btn-secondary badge">{tag}</button></li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="col-12 alert alert-indigo py-3 mb-2">
                                        <div className="alert shadow alert-purple bg-gradient">
                                            پست های مرتبط
                                        </div>
                                        <div className="row gap-1 justify-content-evenly align-items-center">
                                            {selectRelatedPosts(posts, post).map((p, i) => (
                                                <div className="col-3 h-200px card position-relative p-1"
                                                    style={{ backgroundImage: `url(${CDNImage}/${p.ImageName})`, backgroundSize: "cover" }}
                                                >
                                                    <button onClick={() => { handleOpenNewPost(`../single/${p.PostID}`,p.PostID) }} title={p.ShortDescription} className="btn btn-indigo w-auto position-absolute" style={{ bottom: "10px", right: "10px" }}>
                                                        {p.Title}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="col-12 card-footer">
                                        <div className="card border-0 bg-white">

                                            <div className="card-header c-9 w-auto px-0">
                                                <h2 className="card-title text-center text-white">کامنت ها</h2>
                                            </div>

                                            <div className="card-body row bg-white">
                                                {
                                                    isEmpty(comments) ? null :
                                                        (comments.map(comment => (
                                                            <div className="card col-12 bg-light p-0 my-1  m-auto">
                                                                <h4 className="card-header card-title c-7 text-white">
                                                                    {comment.Name} :
                                                            </h4>
                                                                <div className="card-body c-1">
                                                                    {comment.Comment}
                                                                </div>
                                                            </div>
                                                        )))
                                                }
                                            </div>

                                            <div className="card-footer bg-white">
                                                <div className="card c-3">
                                                    <div className="card-header card-title">
                                                        ثبت نظر
                                                </div>
                                                    <div className="card-body">


                                                        <form onSubmit={(e) => { e.preventDefault(); handleSendComment(post.PostID); }} className="form p-1">


                                                            <input className="form-control my-1 bg-dark text-white rounded"
                                                                type="text" name="fullname" id="s-f-fullname" placeholder="نام کامل"
                                                                autocomplete="on"
                                                                value={fullName} onChange={(e) => { setFullName(e.target.value) }}
                                                            />

                                                            <input className="form-control my-1 bg-dark text-white rounded"
                                                                type="email" name="email" id="s-f-email" placeholder="ایمیل"
                                                                autocomplete="on"
                                                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                                            />

                                                            <textarea className="form-control my-1 bg-dark text-white rounded"
                                                                rows="3" name="shortcontent" id="s-f-shortcontent"
                                                                placeholder="توضیح مختصر"
                                                                value={text} onChange={(e) => { setText(e.target.value) }}
                                                            ></textarea>

                                                            <button type="submit"
                                                                className="form-control my-1 btn btn-success">ارسال</button>

                                                        </form>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )}

                    </div>

                </div>
            </div>
        </main>
    );
}

export default withRouter(Single);