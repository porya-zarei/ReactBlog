import isEmpty from "lodash/isEmpty";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {getAllUsers} from "../../redux/action/users";

const Dashboard = ({children}) => {
    const posts = useSelector((state) => state.posts);
    const users = useSelector((state) => state.users);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers(user.Token));
    }, []);

    return (
        <>
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-2 shadow">
                <button
                    className="navbar-toggler d-md-none collapsed bg-secondary"
                    type="button"
                    data-toggle="collapse"
                    data-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link
                    className="navbar-brand col-md-3 col-lg-2 mr-0 px-3"
                    to="/">
                    EINSTEIN
                </Link>

                <div className="form-group d-flex bg-transparent btn-group-justified">
                    <input
                        className="form-control text-white bg-success form-control-dark border-0 rounded-0 rounded-right rounded-pill dashboard-search"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        list="search-data"
                    />
                    <datalist
                        id="search-data"
                        className="text-center align-content-center">
                        {!isEmpty(posts)
                            ? posts.map((p) => (
                                  <option className="alert sm alert-primary">
                                      {p.title}
                                  </option>
                              ))
                            : null}
                        {!isEmpty(users)
                            ? users.map((u) => (
                                  <option className="alert sm alert-warning">
                                      {u.fullName}
                                  </option>
                              ))
                            : null}
                    </datalist>
                    <button className="btn btn-success rounded-right rounded-pill">
                        <i className="bi bi-search" aria-hidden="true"></i>
                    </button>
                </div>

                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <Link
                            className="nav-link btn btn-danger p-2"
                            to="/logout">
                            خروج
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="container-fluid c-9">
                <div className="row">
                    <nav
                        id="sidebarMenu"
                        className="col-md-3 col-lg-2 d-md-block bg-secondary sidebar">
                        <div className="sidebar-sticky p-2">
                            <ul className="nav flex-column m-1 pr-0">
                                <li className="nav-item m-1">
                                    <NavLink
                                        className="nav-link btn btn-outline-primary active"
                                        to="/dashboard">
                                        <i
                                            className="fa fa-dashboard"
                                            aria-hidden="true"></i>
                                        داشبورد
                                    </NavLink>
                                </li>

                                <li className="nav-item m-1">
                                    <NavLink
                                        className="nav-link btn btn-outline-primary active"
                                        to="/dashboard/posts/createpost">
                                        <span
                                            className="fa fa-file-text"
                                            data-feather="add"></span>
                                        افزودن پست
                                    </NavLink>
                                </li>

                                <li className="nav-item m-1">
                                    <NavLink
                                        className="nav-link btn btn-outline-primary active"
                                        to="/dashboard/groups/create">
                                        <span
                                            className="fa fa-file-text"
                                            data-feather="add"></span>
                                        افزودن گروه
                                    </NavLink>
                                </li>

                                <li className="nav-item m-1">
                                    <NavLink
                                        className="nav-link btn btn-outline-primary active"
                                        to="/dashboard/posts">
                                        <i
                                            className="fa fa-files-o"
                                            aria-hidden="true"></i>
                                        پست ها
                                    </NavLink>
                                </li>

                                <li className="nav-item m-1">
                                    <NavLink
                                        className="nav-link btn btn-outline-primary active"
                                        to="/dashboard/groups">
                                        <i
                                            className="fa fa-files-o"
                                            aria-hidden="true"></i>
                                        گروه ها
                                    </NavLink>
                                </li>

                                <li className="d-flex flex-column nav-item m-1">
                                    <NavLink
                                        className="btn text-center alert alert-secondary p-2"
                                        to="/dashboard/users">
                                        اعضا
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main
                        role="main"
                        className="col-md-9 ml-sm-auto col-lg-10 px-md-4 c-9">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
