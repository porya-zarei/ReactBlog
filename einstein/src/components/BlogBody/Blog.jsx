import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { getAllPosts } from '../../redux/action/posts';
import BlogPosts from './BlogPosts';

const Blog = () => {

    const history = useHistory();
    const match = useRouteMatch();
    const posts = useSelector(state => state.posts);
    const groups = useSelector(state => state.groups);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [, forceUpdate] = useState();
    const dispatch = useDispatch();

    const loading = (
        <div className="row justify-content-center text-center mt-5">
            <ScaleLoader className="col-12" color="#0000ff" />
            <Link className="btn btn-info col-12 w-auto" to="/portfolio" >
                بابت مشکل ایجاد شده متاسفم از صفحه "درباره من" دیدن کنید
            </Link>
        </div>
    );

    const getExactSearch = (search) => {
        let reg1 = /(\?(.+))=/g;
        let reg2 = /=(.*)/g;
        let searchType = search.match(reg1)[0].slice(1, -1).replace("%20", " ");
        let searchQuery = search.match(reg2)[0].slice(1).replace("%20", " ");
        console.log("searching  => ", "|", searchType, "|", searchQuery);
        return { searchType, searchQuery };
    }

    console.log("posts in Blog => ", groups);

    const filteringPosts = (q, id) => {

        if (q === "q") {
            if (id !== null) {
                console.log("id in filtering", id);
                if (isString(id)) {
                    console.log("in set fil in typ ", id);
                    const f = posts.filter(p => (p.Tags.includes(id) || p.Title.includes(id) || p.ShortDescription.includes(id) || p.Text.includes(id)));
                    setFilteredPosts(f);
                } else if (isNumber(id)) {
                    console.log(" in f")
                    setFilteredPosts(posts.filter(p => p.GroupID === id));
                }

            } else {
                setFilteredPosts(posts);
            }
        } else {
            setFilteredPosts(posts);
        }
    }

    useEffect(() => {
        dispatch(getAllPosts()); console.log("get post and users in blog");
    },[]);

    useEffect(() => {

        if (!isEmpty(history.location.search)) {
            console.log("match  params q =>", history.location.state);
            const { searchQuery, searchType } = getExactSearch(history.location.search);
            filteringPosts(searchType, searchQuery);

        } else {
            console.log("all post set in blog => ", posts);
            if (posts.length === 0) {
                forceUpdate(1);
                console.log("in force in blog");
            }
            setFilteredPosts(posts);
            console.log("filtered posts => ", filteredPosts);
        }

        console.log("match in blog => ", match, history.location.search.slice(3));

    }, [history, posts]);

    return (
        <main id="body" className="h-100 bg-dark col-md-12 m-0 p-0">
            <div className="m-0 main-body">

                <div id="left-b" className="bg-dark bg-gradient p-2 left-body card border-0">

                    <div className="card-header card-title bg-secondary text-white display-6 mt-5">  پست ها </div>

                    <div className="row justify-content-evenly gap-2 card-body p-0">

                        <div className="col-12 btn-group-sm">

                            <div className="dropdown m-1 d-inline-flex rounded">

                                <button id="dropdowns-menu" type="button" className="btn dropdown dropdown-toggle dropdown-toggle-split btn-sm btn-primary rounded-0 w-auto p-2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    گروه ها
                                    <span className="sr-only"></span>
                                </button>

                                <div className="dropdown-menu bg-light" aria-labelledby="dropdowns-menu">
                                    {isEmpty(groups) ? null :
                                        (
                                            groups.map(group => (
                                                <button onClick={() => { filteringPosts(group.GroupID) }} className="btn btn-warning hover-shadow dropdown-item">{group.GroupTitle}</button>
                                            ))
                                        )
                                    }
                                    <div className="dropdown-divider"></div>
                                </div>

                            </div>
                        </div>
                        {isEmpty(filteredPosts) ? loading :
                            (
                                <BlogPosts filteredPosts={filteredPosts} />
                            )
                        }


                    </div>

                </div>

            </div>
        </main>
    );
}

export default Blog;