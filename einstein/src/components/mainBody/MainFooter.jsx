import { useState } from 'react';
import { toast } from 'react-toastify';
import { contactMe } from '../../services/postService';

const MainFooter = () => {

    const [text, setText] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [fullName, setSetFullName] = useState("");

    const reset = () => {
        setText(""); setClientEmail(""); setSetFullName("");
    }

    const handleContactMe = async (e) => {

        e.preventDefault();
        const data = {
            fullName,
            clientEmail,
            text
        }

        // syncSend(data);

        var result = await contactMe(data);
        console.log("status => ", result, "data in footer =>", data);

        if (result.status === 200) {

            toast.success("ارسال شد دوست عزیز");

            reset();

        }

    }

    return (
        <footer id="footer" className="bg-dark col-md-12 text-center px-3">

            <div className="row p-1 bg-dark">



                <div className="container border border-dark bg-dark text-white mb-3 col-6 pt-3" id="contact-me">

                    <form className="form" onSubmit={handleContactMe}>

                        <fieldset className="form-group row">
                            <legend className="col-form-legend col-sm-1-12">
                                <h4>ارتباط با من</h4>
                            </legend>
                            <div className="col-sm-1-12">

                                <div className="col-sm-1-12">
                                    <input type="text" className="form-control bg-light text-dark my-1" name="fullname"
                                        id="" placeholder="نام کامل"
                                        value={fullName} onChange={(e) => { setSetFullName(e.target.value) }}
                                    />
                                </div>

                                <div className="col-sm-1-12">
                                    <input type="email" className="form-control bg-light text-dark my-1" name="email" id=""
                                        placeholder="ایمیل"
                                        value={clientEmail} onChange={(e) => { setClientEmail(e.target.value) }}
                                    />
                                </div>
                                <div className="form-group">

                                    <textarea className="form-control bg-light text-dark my-1" name="textarea" id=""
                                        rows="3" placeholder="نظر , انتقاد و ..."
                                        value={text} onChange={(e) => { setText(e.target.value) }}
                                    ></textarea>
                                </div>
                            </div>
                        </fieldset>
                        <div className="form-group row">
                            <div className="offset-sm-2 col-sm-12">
                                <button type="submit" className="btn btn-success btn-block w-100">ارسال
                                    <i className="bi bi-mailbox2" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-6 bg-secondary text-center p-2 text-white">
                    <img src={`./images/Illu/contact-me.svg` && `../images/Illu/contact-me.svg`} height="300" width="100%" alt="contact me" />
                </div>
                <div className="text-center bg-warning col-12">

                </div>


            </div>
        </footer>
    );
}

export default MainFooter;