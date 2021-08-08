import { useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Blog from '../components/BlogBody/Blog';
import Single from '../components/BlogBody/Single';
import CreatePost from '../components/dashboardBody/Posts/CreatePost';
import Dashboard from '../components/dashboardBody/Dashboard';
import MainDashboard from '../components/dashboardBody/MainDashboard';
import Main from '../components/mainBody/Main';
import MainBody from '../components/mainBody/MainBody';
import MainFooter from '../components/mainBody/MainFooter';
import MainHeader from '../components/mainBody/MainHeader';
import EditPost from '../components/dashboardBody/Posts/EditPost';
import Posts from '../components/dashboardBody/Posts/Posts';
import Login from '../components/Authorize/Login';
import { useDispatch, useSelector } from 'react-redux';
import Logout from '../components/Authorize/Logout';
import NotFound from '../components/mainBody/NotFound';
import Users from '../components/dashboardBody/Users/Users';
import Groups from '../components/dashboardBody/Groups/Groups';
import CreateGroup from '../components/dashboardBody/Groups/CreateGroup';
import UserProfile from '../components/dashboardBody/Users/Profile';
import Register from '../components/Authorize/Register';
import isEmpty from 'lodash/isEmpty';
import { addUser } from '../redux/action/user';
import { getAllPosts } from '../redux/action/posts';
import { decodeToken } from '../utils/decodeToken';
import { getCookie } from '../utils/cookieTool';
import Portfolio from '../components/BlogBody/Portfolio';
import { getAllUsers } from '../redux/action/users';


const Einstein = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    var myUser;
    var loginUser;


    if (localStorage.getItem("token")) {
        myUser = decodeToken(localStorage.getItem("token")).payload;
        if (myUser.exp >= Date.now() / 1000) {
            loginUser = {
                Identity: myUser.Identity,
                FullName: myUser.FullName,
                Email: myUser.Email,
                Password: myUser.Password,
                Role: myUser.Role,
                Token: localStorage.getItem("token")
            };
            console.log("exp have time ", ((myUser.exp) - (Date.now() / 1000)));
        } else {
            localStorage.removeItem("token");
        }

    }

    console.log("my userrrrr", myUser);

    useEffect(() => {

        dispatch(addUser(loginUser));
        // setCookie("Token", localStorage.getItem("token"), 5);
        console.log("logging.....", user);
        console.log("set cookie =>", getCookie("Token"));
        dispatch(getAllPosts());
        if ((!isEmpty(user) && (String(user.Role) === "Creator" || String(user.Role) === "Admin"))) {
            dispatch(getAllUsers());
        }
    }, []);


    var currentURL = window.location.pathname + window.location.search + window.location.hash;
    return (
        <>

            <Switch>
                <Route path="/dashboard">
                    {(!isEmpty(user) && (String(user.Role) === "Creator" || String(user.Role) === "Admin")) ?

                        <Dashboard>
                            <Switch>
                                <Route exact path="/dashboard" component={MainDashboard} />
                                <Route exact path="/dashboard/posts" component={Posts} />
                                <Route path="/dashboard/posts/createpost" component={CreatePost} />
                                <Route path="/dashboard/posts/editpost/:id" component={EditPost} />
                                <Route path="/dashboard/users" component={Users} />
                                <Route exact path="/dashboard/groups" component={Groups} />
                                <Route path="/dashboard/groups/create" component={CreateGroup} />
                            </Switch>
                        </Dashboard>
                        :
                        <Redirect to="/" >{console.log("no user =>", user)}</Redirect>}

                </Route>

                <Route path={["/", "/*", "/*/*", "/*/*/*"]}>

                    <MainHeader />

                    <MainBody>

                        <Switch>
                            <Route exact path="/" component={Main} />
                            <Route path="/blog" component={Blog} />
                            <Route path="/portfolio" component={Portfolio} />
                            <Route path="/single/:id" render={() => <Single />} />
                            <Route path="/login" render={() => <Login currentUrl={currentURL} />} />
                            <Route path="/logout" component={Logout} />
                            <Route path="/profile" component={UserProfile} />
                            <Route path="/register" component={Register} />
                            <Route path={["*", "/*", "/*/*", "/notfound"]} component={NotFound} />
                        </Switch>

                    </MainBody>

                    <MainFooter />

                </Route>

            </Switch>

        </>
    );
}

export default Einstein;