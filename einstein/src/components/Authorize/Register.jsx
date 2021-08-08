import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { SyncLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import SimpleReactValidator from 'simple-react-validator';
import { registering } from '../../redux/action/users';

const Register = ({ history }) => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, forceUpdate] = useState();
    const [wait, setWait] = useState(false);
    const [autoLogin, setAutoLogin] = useState(false);

    const dispatch = useDispatch();


    const validatior = useRef(new SimpleReactValidator(
        {
            messages:
            {
                "required": "پرکردن این فیلد الزامی است !",
                "min": " کمتر از 5 کاراکتر نباید باشد !",
                "email": "ایمیل نوشته شده صحیح نمی باشد !",
                "integer": "قیمت باید عدد باشد"
            },
            element: message => <div className="alert alert-danger font-smaller">{message}</div>

        }
    ));

    const handleRegisterSubmit = async event => {
        event.preventDefault();
        const user =
        {
            FullName: fullName,
            Email: email,
            Password: password
        }

        try {
            if (validatior.current.allValid()) {
                setWait(true);
                await dispatch(registering(user, history, setFullName, setEmail, setPassword, autoLogin));
                setWait(false);
                forceUpdate(1);
            }
            else {
                setWait(false);
                validatior.current.showMessages();

                forceUpdate(1);
            }
        }
        catch (ex) {
            setWait(false);
            console.log(ex);
            toast.error
                (
                    " کاربر گرامی مشکلی در فرایند ثبت نام پیش امده ", { position: "bottom-right", closeOnClick: true }
                );
        }

    }


    return (
        <div className="alert alert-dark col-12 rounded auth-page mt-5 m-auto row">
            <form className="form p-5 m-auto glass-effect rounded col-sm-12 col-md-6 col-lg-6" onSubmit={handleRegisterSubmit}>

                <div className="">
                    <input className="form-control my-1 bg-dark text-white rounded"
                        type="name" name="fullname" id="f-fullnameregister" placeholder="نام کامل"
                        autocomplete="on"
                        value={fullName} onChange={(e) => { setFullName(e.target.value); validatior.current.showMessageFor("fullname"); }}
                    />
                    {validatior.current.message("fullname", fullName, "required")}
                </div>

                <div className="">
                    <input className="form-control my-1 bg-dark text-white rounded"
                        type="email" name="email" id="f-emailregister" placeholder="ایمیل"
                        autocomplete="on"
                        value={email} onChange={(e) => { setEmail(e.target.value); validatior.current.showMessageFor("email"); }}
                    />
                    {validatior.current.message("email", email, "required|email")}
                </div>

                <div className="">
                    <input className="form-control my-1 bg-dark text-white rounded"
                        type="password" name="password" id="f-passwordregister" placeholder="رمز عبور"
                        autocomplete="on"
                        value={password} onChange={(e) => { setPassword(e.target.value); validatior.current.showMessageFor("password"); }}
                    />
                    {validatior.current.message("password", password, "required|min:5")}
                </div>

                <div className="">
                    <label><input className="checkbox" type="checkbox" name="ck" onChange={() => { setAutoLogin(p => !p) }} /><span className="text-white">  مرا بخاطر بسپار </span></label>
                </div>

                <div className="link">
                    <Link className="btn btn-warning btn-sm m-1" to="/"> <i className="bi bi-lock-fill"></i> رمز عبور خود را فراموش کرده ام !</Link>
                    <Link className="btn btn-info btn-sm m-1" to="/login"> <i className="bi bi-person-fill"></i> ورود به سایت </Link>
                </div>



                {
                    wait ?
                        <div className="text-center mt-3">
                            <SyncLoader color="lightgreen" />
                        </div>
                        :
                        <input autoFocus className="btn btn-success form-control m-1 text-white" value="عضویت" type="submit" />
                }

            </form>
            <div className="col-sm-12 col-md-6">
                <img src="./images/loginsec.svg" alt="login" />
            </div>
        </div>
    );
}

export default withRouter(Register);