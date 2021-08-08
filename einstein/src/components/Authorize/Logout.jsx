import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { clearUser } from '../../redux/action/user';


const Logout = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            localStorage.removeItem("token");
            console.log("token removed ");
            toast.info("به امید دیدار دوست عزیز 😊");
            dispatch(clearUser());
        }
    }, [dispatch]);
    return (
        <>
            <Redirect to="/" />
        </>
    );
}

export default withRouter(Logout);