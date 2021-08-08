import { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from '../../../redux/action/posts';
import JoditEditor from "jodit-react";
import { uploadingImage } from '../../../services/postService';


const CreatePost = () => {

    const user = useSelector(state => state.user);

    const [groupID, setGroupID] = useState(0);
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [text, setText] = useState("");
    const [visit, setVisit] = useState(0);
    const [image, setImage] = useState(null);
    const [showInSlider, setShowInSlider] = useState(false);
    const [tags, setTags] = useState("");
    const [like, setlike] = useState(0);

    const imageput = useRef();

    const editor = useRef(null);

    // const config = {
    //     readonly: false // all options from https://xdsoft.net/jodit/doc/
    // }

    const dispatch = useDispatch();

    const handleGetImage = async (e) => {
        e.preventDefault();
        await imageput.current.click();
        console.log(imageput.current);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(showInSlider);
        const data =
        {
            "Identity": String(user.Identity),
            "GroupID": Number.parseInt(groupID),
            "Title": title,
            "ShortDescription": shortDescription,
            "Text": text,
            "Visit": Number.parseInt(visit)||0,
            "ImageName": image||"",
            "ShowInSlider": showInSlider,
            "Tags": tags,
            "Like": Number.parseInt(like)||0,
            "image":imageput.current.files[0]
        };

        console.log(data);
        var form_data = new FormData();

        for (var key in data) {
            form_data.append(key, data[key]);
        }
        // console.log("form _ data => ",form_data.get("Title"));
        // const sData = new FormData(data);
        // sData.append("image",imageput.current.files[0]);
        if (data.Text !== null) {
            console.log("sending data => ")
            dispatch(createNewPost(form_data, user.Token));
        }

    }





    return (
        <div className="p-2 rounded row bg-light m-1 mt-3">
            <div className="container">
                <form className="" onSubmit={handleSubmit}>

                    <fieldset className="form-group row">
                        <legend className="col-form-legend col-sm-1-12">افزودن پست</legend>
                        <div className="col-sm-1-12 form">

                            <input className="form-control m-1 p-1 bg-dark text-white rounded" type="number"
                                name="groupid" id="f-groupid" placeholder="ایدی گروه"
                                onChange={(e) => { setGroupID(e.target.value) }} value={groupID}
                            />

                            <input className="form-control m-1 p-1 bg-dark text-white rounded" type="text"
                                name="title" id="f-title" placeholder="عنوان" autocomplete="on"
                                onChange={(e) => { setTitle(e.target.value) }} value={title}
                            />


                            <textarea className="form-control m-1 p-1 bg-dark text-white rounded" rows="3"
                                name="shortcontent" id="f-shortcontent" placeholder="توضیح مختصر"
                                onChange={(e) => { setShortDescription(e.target.value) }} value={shortDescription}
                            >
                            </textarea>


                            {/* <textarea className="form-control m-1 p-1 bg-dark text-white rounded" rows="6"
                                name="content" id="f-content" placeholder="محتوا"
                                onChange={(e) => { setText(e.target.value) }} value={text}
                            ></textarea> */}

                            <JoditEditor
                                className="form-control m-1 p-1 bg-dark text-white rounded"
                                ref={editor}
                                value={text}
                                tabIndex={1} // tabIndex of textarea
                                onChange={newContent => { setText(newContent); }}
                            />
                            <input className=""
                                type="file"
                                style={{ display: 'none' }}
                                name="image" id="f-image"
                                onChange={(e) => { setImage(e.target.files[0].name) }}
                                ref={imageput}
                            />

                            <button className="btn btn-dark m-1 p-2 px-3" onClick={handleGetImage}>
                                <i className="bi bi-image-fill"></i>

                            </button>

                            <input className="form-control m-1 p-1 bg-dark text-white rounded" type="text"
                                name="tags" id="f-tags" placeholder="برچسب ها" autocomplete="on"
                                onChange={(e) => { setTags(e.target.value) }} value={tags}
                            />


                            <input className="form-control m-1 p-1 bg-dark text-white rounded" type="number"
                                name="like" id="f-like" placeholder="پسندیدن"
                                onChange={(e) => { setlike(e.target.value) }} value={like}
                            />


                            <input className="form-control m-1 p-1 bg-dark text-white rounded" type="number"
                                name="visits" id="f-visits" placeholder="بازدید"
                                onChange={(e) => { setVisit(e.target.value) }} value={visit}
                            />


                            <input className="mr-2" type="checkbox"
                                name="showinslider" id="f-showinslider"
                                onChange={(e) => { setShowInSlider(!showInSlider) }} value={showInSlider}
                            />

                            <button type="submit" className="btn btn-primary form-control m-1 p-1">ثبت</button>
                        </div>
                    </fieldset>

                </form>
            </div>


        </div>
    );
}

export default CreatePost;