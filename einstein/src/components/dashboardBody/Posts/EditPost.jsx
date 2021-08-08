import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handlePostUpdate } from '../../../redux/action/posts';
import JoditEditor from "jodit-react";

const EditPost = ({ match }) => {

    // const [set, setSet] = useState(true);
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts);
    const post = useSelector(state => state.post);
    const user = useSelector(state => state.user);

    useEffect(() => {
        const setting = () => {
            setGroupID(Number.parseInt(post.GroupID));
            setTitle(post.Title);
            setShortDescription(post.ShortDescription);
            setText(post.Text);
            setVisit(Number.parseInt(post.Visit));
            setImage(post.Image);
            setTags(post.Tags);
            setlike(Number.parseInt(post.Like));

            console.log("post in set =>", post);
            console.log("end set");
        }
        setting();

    }, [post]);

    // const [post,setPost] = useState({});

    console.log("posts and post inedit =?> ", posts, post);

    const [groupID, setGroupID] = useState();
    const [title, setTitle] = useState();
    const [shortDescription, setShortDescription] = useState();
    const [text, setText] = useState();
    const [visit, setVisit] = useState();
    const [image, setImage] = useState();
    const [showInSlider, setShowInSlider] = useState(false);
    const [tags, setTags] = useState();
    const [like, setlike] = useState();

    const imageput = useRef();

    const editor = useRef(null);


    const handleGetImage = async (e) => {
        e.preventDefault();
        await imageput.current.click();
        console.log(imageput.current);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const data =
        {
            "Identity": String(post.Identity),
            "PostID": Number.parseInt(post.PostID),
            "GroupID": Number.parseInt(groupID),
            "Title": title,
            "ShortDescription": shortDescription,
            "Text": text,
            "Visit": Number.parseInt(visit),
            "ImageName": image || post.ImageName,
            "CreateDate": post.createDate,
            "ShowInSlider": showInSlider,
            "Tags": tags,
            "Like": Number.parseInt(like),
            "image": imageput.current.files[0]
        };

        //Dispatch
        console.log(data);

        var formData = new FormData();

        for (var key in data) {
            formData.append(key, data[key]);
        }

        if (data.Text !== null) {
            console.log("sending data => ")
            dispatch(handlePostUpdate(match.params.id, formData,user.Token));
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
                                multiple="false"
                            />

                            <button className="btn btn-dark m-1 p-2 px-3" onClick={handleGetImage}>
                                <i className="fa fa-image"></i>

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
                                onChange={(e) => { setShowInSlider(p => !p) }} value={showInSlider}
                            />

                            <button type="submit" className="btn btn-primary form-control m-1 p-1">ثبت</button>
                        </div>
                    </fieldset>

                </form>
            </div>


        </div>
    );
}

export default EditPost;