import { useState } from 'react';
import { useDispatch } from "react-redux";
import { createNewGroup } from '../../../redux/action/groups';


const CreateGroup = () => {

    const [groupTitle, setGroupTitle] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        const data =
        {

            "groupTitle": groupTitle,

        };



        //Dispatch
        console.log(data);
        dispatch(createNewGroup(data));

    }





    return (
        <div className="p-2 rounded row bg-light m-1 mt-3">


            <div className="container">
                <form className="" onSubmit={handleSubmit}>

                    <fieldset className="form-group row">
                        <legend className="col-form-legend col-sm-1-12">افزودن گروه</legend>
                        <div className="col-sm-1-12 form">


                            <input className="form-control m-1 p-1 bg-dark text-white rounded" type="text"
                                name="grouptitle" id="f-grouptitle" placeholder="نام گروه"
                                onChange={(e) => { setGroupTitle(e.target.value) }} value={groupTitle}
                            />


                            <button type="submit" className="btn btn-primary form-control m-1 p-1">ثبت</button>
                        </div>
                    </fieldset>

                </form>
            </div>


        </div>
    );
}

export default CreateGroup;