import {useRef, useState} from "react";
import isEmpty from "lodash/isEmpty";
import {Redirect} from "react-router";
import {SyncLoader} from "react-spinners";
import {toast} from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../services/userServices";
import {addUser} from "../../redux/action/user";
import {decodeToken} from "../../utils/decodeToken";

const Login = ({history}) => {
    const [autoLogin, setAutoLogin] = useState(false);
    const [wait, setWait] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, forceUpdate] = useState();
    const [isLoged, setIsLoged] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const validatior = useRef(
        new SimpleReactValidator({
            messages: {
                required: "پرکردن این فیلد الزامی است !",
                min: " کمتر از 5 کاراکتر نباید باشد !",
                email: "ایمیل نوشته شده صحیح نمی باشد !",
            },
            element: (message) => (
                <div className="alert alert-danger font-smaller">{message}</div>
            ),
        }),
    );

    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            email,
            password,
        };

        try {
            if (validatior.current.allValid()) {
                setWait(true);
                const r = await loginUser(user);
                console.log("full result in login", r);
                const {data, status} = r;
                setWait(false);
                console.log(data, "in login");
                console.log("satus code in login => ", status);
                if (status === 200) {
                    setIsLoged(true);
                    toast.success(" خوش اومدی عزیزم 😍", {
                        position: "bottom-right",
                        closeOnClick: true,
                    });
                    setEmail();
                    setPassword();
                    console.log("cookie in login => ",document.cookie);
                    // forceUpdate(1);
                    const dec = decodeToken(data).payload;
                    if (autoLogin) {
                        localStorage.setItem("token", String(data));
                        console.log(
                            "token added => ",
                            localStorage.getItem("token"),
                        );
                    }

                    const logUser = {
                        Identity: dec.Identity,
                        FullName: dec.FullName,
                        Email: dec.Email,
                        Password: dec.Password,
                        Role: dec.Role,
                        Token: data,
                    };
                    console.log("log user => ", logUser);
                    dispatch(addUser(logUser));

                    history.replace("/");
                } else if (status === 404) {
                    setWait(false);
                    toast.error(
                        " کاربر گرامی حسابی با این مشخصات وجود ندارد ",
                        {position: "bottom-right", closeOnClick: true},
                    );
                }
            } else {
                validatior.current.showMessages();
                setWait(false);
                // forceUpdate(1);
            }
        } catch (ex) {
            if (isLoged) {
                console.log("login catch =>", ex);
                var error = String(ex.toString());
                if (error.search("404") > -1) {
                    console.log("status code 2 login =>", error.search("404"));
                    toast.error(
                        " کاربر گرامی حسابی با این مشخصات وجود ندارد ",
                        {position: "bottom-right", closeOnClick: true},
                    );
                } else if (error.search("400") > -1) {
                    console.log("status code 3 login =>", error.search("400"));
                    toast.error(" کاربر گرامی رمز عبور شما نادرست است ", {
                        position: "bottom-right",
                        closeOnClick: true,
                    });
                } else {
                    toast.error(
                        " کاربر گرامی مشکلی در فرایند ثبت نام پیش امده ",
                        {position: "bottom-right", closeOnClick: true},
                    );
                }

                console.log(ex);
                setWait(false);
            }
        } finally {
            setWait(false);
        }
    };

    if (!isEmpty(user)) {
        return <Redirect to="/" />;
    }

    return (
        <>
            <div className="alert alert-dark col-12 rounded auth-page row m-auto mt-5">
                <form
                    className="form p-5 m-auto col-lg-6 col-md-6 col-sm-12 glass-effect rounded"
                    onSubmit={handleSubmit}>
                    <div className="">
                        <input
                            className="form-control my-1 bg-dark text-white rounded"
                            type="email"
                            name="email"
                            id="f-emaillogin"
                            placeholder="ایمیل"
                            autocomplete="on"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                validatior.current.showMessageFor("email");
                            }}
                        />
                        {validatior.current.message(
                            "email",
                            email,
                            "required|email",
                        )}
                    </div>

                    <div className="">
                        <input
                            className="form-control my-1 bg-dark text-white rounded"
                            type="password"
                            name="password"
                            id="f-passwordlogin"
                            placeholder="رمز عبور"
                            autocomplete="on"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                validatior.current.showMessageFor("password");
                            }}
                        />
                        {validatior.current.message(
                            "password",
                            password,
                            "required|min:5",
                        )}
                    </div>

                    <div className="">
                        <label>
                            <input
                                className="checkbox"
                                type="checkbox"
                                name="ck"
                                onChange={() => {
                                    setAutoLogin((p) => !p);
                                }}
                            />
                            <span className="text-white">
                                {" "}
                                مرا بخاطر بسپار{" "}
                            </span>
                        </label>
                    </div>

                    <div className="link">
                        <Link className="btn btn-warning btn-sm m-1" to="/">
                            {" "}
                            <i className="bi bi-lock-fill"></i> رمز عبور خود را
                            فراموش کرده ام !
                        </Link>
                        <Link
                            className="btn btn-info btn-sm m-1"
                            to="/register">
                            {" "}
                            <i className="bi bi-person-fill"></i> عضویت در سایت{" "}
                        </Link>
                    </div>

                    {wait ? (
                        <div className="text-center mt-3">
                            <SyncLoader color="lightgreen" />
                        </div>
                    ) : (
                        <input
                            autoFocus
                            className="btn btn-success form-control m-1 text-white"
                            value="ورود"
                            type="submit"
                        />
                    )}
                </form>
                <div className="col-sm-12 col-md-6">
                    <img src="./images/logincolor.svg" alt="login" />
                </div>
            </div>
        </>
    );
};

export default Login;
