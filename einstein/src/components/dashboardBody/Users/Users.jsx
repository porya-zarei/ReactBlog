import isEmpty from 'lodash/isEmpty';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers, updateUserForAdmin } from '../../../redux/action/users';

const Users = () => {

    var users = useSelector(state => state.users);
    var user = useSelector((state) => state.user);
    const [wait,setWait] = useState(false);
    const [userEdit, setUserEdit] = useState();
    console.log("users in dash =>", users);
    const RolesOb = {
        5:"Creator",
        4: "Admin",
        3: "Bloger",
        2: "SpecialUser",
        1: "Topuser",
        0: "User"
    };
    const Roles = ["User", "TopUser", "SpecialUser", "Bloger", "Admin"];
    const [newPassword, setNewPassword] = useState();
    const [newFullName, setNewFullName] = useState();
    const [newEmail, setNewEmail] = useState();
    const [newRole, setNewRole] = useState();
    const dispatch = useDispatch();
    const handleRemoveUser = (identity) => {
        dispatch(deleteUser(identity,user.Token));
        dispatch(getAllUsers(user.Token));
    }

    const UserForEdit = async (identity) => {

        await setUserEdit(users.find(u => u.Identity === identity));
        console.log("user in edit user => ", userEdit, identity);
    }

    const handleEditUser = async (e) => {
        e.preventDefault();
        const data = {
            Identity:userEdit.Identity,
            FullName:isEmpty(newFullName)?userEdit.FullName:newFullName,
            Email: isEmpty(newEmail) ? userEdit.Email : newEmail,
            Password: isEmpty(newPassword) ? userEdit.Password : newPassword,
            Role: Number(isEmpty(newRole) ? userEdit.Role : newRole),
        }
        console.log("new data in edit with admin => ",data);
        setWait(true);
        await dispatch(updateUserForAdmin(data,user.Token));
        setWait(false);
    }

    return (
        <div className="p-2 h-auto rounded row bg-light m-1 mt-3">
            <div id="userforedit" className="col-12">
                {!isEmpty(userEdit) ? (
                    <div className="">
                        <form className="row gap-2">
                            <div className="col-12">
                                <div className="row p-2 justify-content-center align-items-baseline alert-dark rounded-2">
                                    <div className="d-inline-flex col-12">
                                        <label className="">نام کامل :</label>
                                        <input
                                            type="text"
                                            className="form-control w-auto"
                                            value={newFullName}
                                            onChange={(e) => {
                                                setNewFullName(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <span className="col-12">
                                        قدیمی : {userEdit.FullName}
                                    </span>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="row p-2 justify-content-center align-items-baseline alert-dark rounded-2">
                                    <div className="d-inline-flex col-12">
                                        <label className="">پسورد :</label>
                                        <input
                                            type="text"
                                            className="form-control w-auto"
                                            value={newEmail}
                                            onChange={(e) => {
                                                setNewEmail(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <span className="col-12">
                                        قدیمی : {userEdit.Email}
                                    </span>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="row p-2 justify-content-center align-items-baseline alert-dark rounded-2">
                                    <div className="d-inline-flex col-12">
                                        <label className="">پسورد :</label>
                                        <input
                                            type="text"
                                            className="form-control w-auto"
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <span className="col-12">
                                        قدیمی : {userEdit.Password}
                                    </span>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="row p-2 justify-content-center align-items-baseline alert-dark rounded-2">
                                    <div className="d-inline-flex col-12">
                                        <label className="form-check-label m-1">
                                            نقش :
                                        </label>
                                        <select
                                            className="p-2 m-1 outline-none border-0 bg-secondary rounded-2 text-white"
                                            onClick={(e) => {
                                                console.log(
                                                    "target => ",
                                                    e.target,
                                                );
                                                setNewRole(e.target.value);
                                            }}>
                                            {Roles.map((r, i) => (
                                                <option value={i}>{r}</option>
                                            ))}
                                            {/* <option value="1">porya</option> */}
                                        </select>
                                    </div>
                                    <span className="col-12">
                                        نقش قدیمی : {RolesOb[userEdit.Role]}
                                    </span>
                                </div>
                            </div>
                            {/* <label>
                                    پسورد :
                                    <input value={newPassword} onBlur={(e) => { setNewPassword(e.target.value) }} />
                                    <span>{userEdit.Password}</span>
                                </label> */}
                            <div>
                                <input
                                    className="btn btn-success w-100"
                                    type="submit"
                                    value="ثبت"
                                    onClick={handleEditUser}
                                />
                                {wait ? (
                                    <span className="spinner-border"></span>
                                ) : null}
                            </div>
                        </form>
                    </div>
                ) : null}
            </div>
            <div className="divider"></div>
            <div className="col-12">
                <h2 className="h-auto">اعضا</h2>
                <div className="table-responsive">
                    <table className="table table-hover table-secondary">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>نام</th>
                                <th>ایمیل</th>
                                <th>حذف</th>
                                <th>ویرایش</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isEmpty(users)
                                ? null
                                : users.map((user, i) => (
                                      <tr>
                                          <td>{i}</td>
                                          <td>
                                              <a
                                                  href="#userforedit"
                                                  onClick={() => {
                                                      UserForEdit(
                                                          user.Identity,
                                                      );
                                                  }}
                                                  className="btn btn-dark">
                                                  {user.FullName}
                                              </a>
                                          </td>
                                          <td>{user.Email}</td>
                                          <td>
                                              <button
                                                  className="btn btn-danger bi bi-trash-fill"
                                                  onClick={() => {
                                                      handleRemoveUser(
                                                          user.Identity,
                                                      );
                                                  }}></button>
                                          </td>
                                          <td>
                                              <button className="btn btn-warning bi bi-pencil-square"></button>
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-12 text-center">
                <img
                    src="../images/illu/admin-wait.svg"
                    className="h-50vh w-100"
                    alt="filler; not important :)"
                />
            </div>
        </div>
    );
}

export default Users;