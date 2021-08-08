import isEmpty from 'lodash/isEmpty';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHotkeys } from "react-hotkeys-hook";
import useCurrentWidth from '../../utils/windowWidth';

const MainHeader = () => {


    const [showNav, setShowNav] = useState(true);

    var user = useSelector(state => state.user);

    console.log("user in hed ", user);


    // ! --------------------------------------------------
    const input = useRef();
    const login = useRef();
    const blog = useRef();
    const about = useRef();
    const home = useRef();
    const profile = useRef();
    const dashboard = useRef();

    useHotkeys('ctrl+i', () => { input.current.focus(); });
    useHotkeys('ctrl+l', () => { login.current.click(); });
    useHotkeys('ctrl+b', () => { blog.current.click(); });
    useHotkeys('ctrl+m', () => { about.current.click(); });
    useHotkeys('ctrl+h', (e) => { e.preventDefault(); home.current.click(); });
    useHotkeys('ctrl+p', () => { profile.current.click(); });
    useHotkeys('ctrl+z', (e) => {
        e.preventDefault();
        console.log("dash => ", dashboard.current);
        if (dashboard.current !== null) { dashboard.current.click() }
    });
    // ! --------------------------------------------------

    const [notEvent, setNotEvent] = useState();

    const showFirstNotification = async () => {

        if ("serviceWorker" in navigator && "PushManager" in window) {

            Notification.requestPermission().then(result => {
                console.log("result in pushhh permission => ", result);
            });
        }
        if (notEvent) {
            console.log("install prompt , event =>", notEvent);
            notEvent.prompt();
            notEvent.userChoice
                .then(async (choiceResult) => {
                    if (choiceResult.outcome === "accepted") {
                        console.log("user accept");
                        await navigator.serviceWorker.ready.then(registeration => {
                            registeration.showNotification
                                ("ممنون !",
                                    {
                                        body: "از این به بعد به خوبی از اخرین تغییرات با خبر میشی 😜",
                                        dir: "rtl",
                                        icon: "./icon/pze.svg",
                                        badge: "./icon/pze.svg",
                                        actions:
                                            [
                                                {
                                                    title: "View Site",
                                                    "action": "visit-site"
                                                },
                                                {
                                                    title: "View Profile",
                                                    "action": "view-profile"
                                                }

                                            ]
                                    }
                                );
                        })
                    }
                })
        }

        if ("serviceWorker" in navigator && "PushManager" in window) {

        }
    }


    const handleResize = (width) => {
        console.log("width in header => ", width);
        if (width > 500) {
            setShowNav(true);
        } else {
            setShowNav(false);
        }
    }

    const width = useCurrentWidth();

    useEffect(() => {
        console.log("screen", window.screen.width);
        if (window.screen.width > 500) {
            setShowNav(true);
        } else {
            setShowNav(false);
        }
        handleResize(width);
        console.log("Admin ??? => ", (user !== null && (String(user.Role) === "Creator" || String(user.Role) === "Admin")));
        console.log(user.Role);

        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            setNotEvent(e);
            console.log("in beforinstallprompt => ", notEvent);
        });

        console.log("not => ", notEvent);

    }, [width]);

    const searchInput =
        (
            <div className="nav-div3 mx-1 w-auto rounded-pill border border-2 d-inline-flex">

                <input ref={input} className="outline-none border-0 nav-div3-search py-1 px-3 bg-transparent w-100" placeholder="جست و جو ..." />
                <span className="italic text-secondary text-center my-auto m-1">ctrl+i</span>
                <button name="searchBtnInHeader" className="btn btn-outline-dark bi bi-search rounded-circle border-0 shadow-none p-2 m-0 ripple"></button>

            </div>
        );

    const nav = (
        <nav id="page-nav" className="nav my-page-nav">

            <div className="nav-div1">
                <NavLink ref={home} title="ctrl+h" exact to="/" className="btn btn-outline-dark nav-item m-2 border-0">صفحه اصلی
                            <i className="mx-1 bi bi-house" aria-hidden="true"></i>
                </NavLink>
                <NavLink ref={blog} title="ctrl+b" to="/blog" className="btn btn-outline-dark nav-item m-2 border-0">وبلاگ
                            <i className="mx-1 bi bi-stack" aria-hidden="true"></i>
                </NavLink>
                <NavLink ref={about} title="ctrl+m" to="/portfolio" className="btn btn-outline-dark nav-item m-2 border-0"> درباره من
                            <i className="bi bi-file-earmark-person-fill mx-1" aria-hidden="true"></i>
                </NavLink>
                {(user === null || isEmpty(user.FullName)) ?
                    <NavLink ref={login} title="ctrl+l" to="/login" className="btn btn-outline-dark nav-item m-2 border-0"> ورود | عضویت
                            <i className="mx-1 bi bi-box-arrow-in-left" aria-hidden="true"></i>
                    </NavLink>
                    :
                    <NavLink ref={profile} title="ctrl+p" to="/profile" className="btn btn-outline-dark nav-item m-2 border-0">
                        {user.FullName}
                        <i className="bi bi-person-lines-fill" aria-hidden="true"></i>
                    </NavLink>
                }
                {
                    (user !== null && (String(user.Role) === "Creator" || String(user.Role) === "Admin")) ?
                        <NavLink ref={dashboard} title="ctrl+d" to="/dashboard" className="btn btn-outline-dark nav-item m-2 border-0">داشبرد
                            <i className="bi bi-speedometer" aria-hidden="true"></i>
                        </NavLink>
                        :
                        null
                }
            </div>
            {searchInput}
            <div className="nav-div2 btn-group-sm p-2 float-left">
                <a about="instagram" className="btn btn-sm btn-dark top-icons-parent top-instagram-icon-hover rounded-circle m-1" href="http://instagram.com/porya._.za" target="_blank"
                    rel="noopener noreferrer">
                    <i className="bi bi-instagram"></i>
                </a>
                <a about="linkedin" className="btn btn-sm btn-dark top-icons-parent top-linkedin-icon-hover rounded-circle m-1" href="http://instagram.com/porya._.za" target="_blank"
                    rel="noopener noreferrer">
                    <i class="bi bi-linkedin"></i>
                </a>
                <a about="github" className="btn btn-sm btn-dark top-icons-parent top-github-icon-hover rounded-circle m-1" href="http://instagram.com/porya._.za" target="_blank"
                    rel="noopener noreferrer">
                    <i class="bi bi-github"></i>
                </a>
                <a about="rss" className="btn btn-sm btn-dark top-icons-parent top-rss-icon-hover rounded-circle m-1" href="http://instagram.com/porya._.za" target="_blank"
                    rel="noopener noreferrer">
                    <i className="bi bi-rss-fill" aria-hidden="true"></i>
                </a>
                <button
                    onClick={() => { showFirstNotification(); }}
                    className="btn btn-outline-warning rounded border-0 pulser-effect-hover"
                >
                    🔔+
                </button>
            </div>
        </nav>
    );

    return (
        <header id="nav" className="bg-white rounded-bottom shadow h-auto fixed-top d-inline-flex">


            <button id="btn-nav" className="my-btn-nav btn btn-dark m-1" type="button" onClick={() => { setShowNav(p => !p) }}>
                <i className="bi bi-list" aria-hidden="true"></i>
            </button>

            {showNav ? nav : searchInput}
        </header>
    );
}

export default MainHeader;