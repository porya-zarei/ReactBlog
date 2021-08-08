import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteGroup } from '../../../services/groupService';


const Groups = () => {

    const groups = useSelector(state => state.groups);
    const history = useHistory();
    console.log("groups in dash =>", groups);

    const handleDeleteGroup = (id) => {
        deleteGroup(id);
    }

    return (
        <div className="p-2 rounded row bg-light m-1 mt-3">

            <div className="col-12">
                <h2>گروه ها</h2>
                <div className="table-responsive">
                    <table className="table table-hover table-info">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>نام</th>
                                <th>حذف</th>
                                <th>ویرایش</th>
                            </tr>
                        </thead>
                        <tbody>

                            {isEmpty(groups) ? null :
                                (groups.map((group, i) => (
                                    <tr>
                                        <td>{i}</td>
                                        <td><button onClick={() => { history.push(`/blog/?q=${group.GroupTitle}`, group.GroupID); }} className="btn btn-dark">{group.GroupTitle}</button></td>
                                        <td><button onClick={() => { handleDeleteGroup(group.GroupID) }} className="btn btn-danger bi bi-trash-fill"></button></td>
                                        <td><button className="btn btn-warning bi bi-pencil-square"></button></td>
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

export default Groups;