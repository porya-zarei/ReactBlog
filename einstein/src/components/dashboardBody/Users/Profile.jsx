import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
// import localForage from "localforage";
import {updateCurrentUser} from "../../../redux/action/users";
import {toast} from "react-toastify";
import {Link, Redirect} from "react-router-dom";
import isEmpty from "lodash/isEmpty";

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    console.log("user in prof => ", user);
    const [show, setShow] = useState(false);
    const [fullName, setFullName] = useState(user.FullName);
    const [email, setEmail] = useState(user.Email);
    const [password, setPassword] = useState(user.Password);

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const data = {
            Identity: String(user.Identity),
            FullName: fullName,
            Email: email,
            Password: password,
        };
        console.log("data in update f", data);
        dispatch(updateCurrentUser(data, user.Token));
        toast.success("با موفقیت ویرایش شد");
    };
    if (isEmpty(user)) {
        <Redirect to="/login" />;
    }
    return (
        <main id="body" className="bg-body h-100 bg-light col-md-12 m-0 p-0">
            <div className="m-0 main-body row">
                <div
                    id="left-b"
                    className="bg-white left-body card border-0 col-12 mt-5">
                    <div className="row m-1 bg-light shadow rounded">
                        <img
                            src="./images/Illu/profile.svg"
                            className="col-md-5 col-sm-12 animate__animated animate__bounce"
                            width="100%"
                            alt="profileImage"
                        />
                        <div className="card-body m-2 col-md-6 col-sm-12">
                            <div className="alert alert-dark">
                                <dl>نام کامل</dl>
                                <dt>{user.FullName}</dt>
                            </div>
                            <div className="alert alert-dark">
                                <dl>نام کامل</dl>
                                <dt>{user.Email}</dt>
                            </div>
                            <div className="alert alert-dark">
                                <dl>نام کامل</dl>
                                <dt>{user.Password}</dt>
                            </div>
                            <div className="">
                                <button
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                    className="btn btn-warning m-1">
                                    ویرایش
                                </button>
                                <Link
                                    to="/logout"
                                    className="btn btn-danger m-1">
                                    خروج
                                </Link>
                            </div>
                        </div>
                    </div>
                    {show ? (
                        <div className="card col-12 animate__animated animate__zoomInUp">
                            <form className="card-body bg-light rounded shadow p-2">
                                <table className="table table-responsive table-hover text-center">
                                    <tr className="d-table-row m-1">
                                        <td>
                                            <input
                                                className="input rounded form-control bg-secondary text-white p-2"
                                                value={fullName}
                                                onChange={(e) => {
                                                    setFullName(e.target.value);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr className="d-table-row m-1">
                                        <td>
                                            <input
                                                className="input rounded form-control bg-secondary text-white p-2"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr className="d-table-row m-1">
                                        <td>
                                            <input
                                                className="input rounded form-control bg-secondary text-white p-2"
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr className="d-table-row m-1">
                                        <td>
                                            <button
                                                onClick={handleUpdateUser}
                                                className="form-control bg-success p-2 btn btn-success">
                                                ثبت
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    ) : null}
                </div>
            </div>
        </main>
    );
};

export default UserProfile;
