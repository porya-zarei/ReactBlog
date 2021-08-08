import isEmpty from 'lodash/isEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSinglePost } from '../../../redux/action/post';
import { getAllPosts, handlePostDelete } from '../../../redux/action/posts';



const Posts = () => {
    const dispatch = useDispatch();
    getAllPosts();

    const posts = useSelector(state => state.posts);

    console.log("posts in dashboard => ", posts);


    const deletePost = (id) => {

        handlePostDelete(id);

    }

    const geting = (id)=>{
        dispatch(getSinglePost(id));
    }



    return (
        <div className="p-2 rounded row bg-secondary m-1 mt-3">

            <div className="col-12">
                <h2>پست ها</h2>
                <div className="table-responsive">
                    <table className="table table-hover table-dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>عنوان</th>
                                <th>توضیح کوتاه</th>
                                <th>حذف</th>
                                <th>ویرایش</th>
                            </tr>
                        </thead>
                        <tbody>

                            {isEmpty(posts) ?
                                <div className="alert alert-dark">
                                    بارگزاری ...
                            </div>
                                :
                                (posts.map((post, i) => (
                                    <tr>
                                        <td>{i}</td>
                                        <td><Link to={`/single/${post.PostID}`} className="btn btn-dark">{post.Title}</Link></td>
                                        <td>{post.ShortDescription}</td>
                                        <td><button onClick={() => { deletePost(post.PostID) }} className="btn btn-danger bi bi-trash-fill"></button></td>
                                        <td><Link onMouseDown={() => { geting(post.PostID) }} to={`/dashboard/posts/editpost/${post.PostID}`} className="btn btn-warning bi bi-pencil-square"></Link></td>
                                    </tr>
                                )))}


                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-12 text-center">
                <img src="../images/illu/admin-wait.svg" className="h-50vh w-100" alt="filler; not important :)" />
            </div>
        </div>

    );
}

export default Posts;