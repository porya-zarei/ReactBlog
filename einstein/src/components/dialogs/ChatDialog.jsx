import { useState } from 'react';
import ChatAlert from './ChatAlert';

const ChatDialog = () => {


    const [show, setShow] = useState(false);
    const [chatContent, setChatContent] = useState([]);
    // const content = [];
    // const [content,setContent]=useState();
    const [chatting, setChatting] = useState("");

    function add(i, btn) {
        for (let index = 0; index < i; index++) {
            // content.push(btn);
            setChatContent(p => [...p, btn]);
        }
    }

    function readOutLoud(message) {

        var speech = new SpeechSynthesisUtterance();

        // Set the text and voice attributes.

        speech.text = message;

        speech.volume = 1;

        speech.rate = 1;

        speech.pitch = 1;

        window.speechSynthesis.speak(speech);

    }

    function addChat() {

        if (chatting) {
            add(1, <ChatAlert text={chatting} />);
            switch (chatting) {
                case "سلام":
                    add(1, <ChatAlert color="danger" text="سلام 😀" />); readOutLoud("hi");
                    break;

                case "خوبی":
                    add(1, <ChatAlert color="danger" text="عالی تو چطوری ؟؟" />);
                    break;

                case "عالی":
                    add(1, <ChatAlert color="danger" text="خداروشکر" />);
                    break;

                case "اهل کجایی":
                    add(1, <ChatAlert color="danger" text="🏞🏕🏜 نیشابور 🏖🏝🏞" />);
                    break;

                case "رشتت چیه؟؟":
                    add(1, <ChatAlert color="danger" text="برق 🐱‍🚀 🐱‍💻" />);
                    break;

                case "پوریا":
                    add(1, <ChatAlert color="danger" text="بله 🤩" />);
                    break;

                default:
                    break;
            }
            setChatting("");
        }
    }

    const clearChat = async () => {
        await setChatContent([]);
    }


    const myBtn = (
        <button id="btn-op" name="chatDialogButton" className="btn btn-lg btn-warning btn-dialogz animate__animated animate__backInDown" onClick={() => { setShow(true); }}>
            <i className="bi bi-chat-right-dots-fill" aria-hidden="true"></i>
        </button>
    );

    const myChat = (
        <div id="my-chat" className="chat-dialog animate__animated animate__backInUp">
            <div className="card bg-light">

                <h5 className="card-header alert alert-light p-1 shadow text-center">
                    <button id="btn-cl" className="ml-1 bi bi-x-diamond-fill btn btn-danger text-white float-end btn-sm btn-c" onClick={() => { setShow(false); }}>
                    </button>
                    <div className="text-center mt-1 user-select-none">پاسخ سوالات متداول</div>
                </h5>

                <div className="card-body">

                    <div id="chat-content" className="card-text chat-c p-2">
                        <ul id="chat-content-ul" className="chat-c-u">
                            {chatContent}
                        </ul>
                    </div>
                </div>

                <div className="card-footer d-flex">
                    <div className="dropup mx-1 d-inline-flex rounded">

                        <button id="dropdowns-menu" type="button" className="btn dropdown dropdown-toggle dropdown-toggle-split btn-sm btn-primary h-100 rounded-0 w-25" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="sr-only"></span>
                        </button>
                        <button type="button" className="btn btn-sm btn-primary rounded-0 h-100 w-75 p-0" onClick={addChat}>
                            <i className="bi bi-play fs-4"></i>
                        </button>

                        <div className="dropdown-menu bg-warning" aria-labelledby="dropdowns-menu">
                            <button className="btn btn-outline-info dropdown-item">HI</button>
                            <div className="dropdown-divider"></div>
                            <button type="button" className="dropdown-item btn btn-primary" onClick={clearChat}>Clear Chat</button>
                        </div>

                    </div>

                    <input value={chatting} onChange={(e) => { setChatting(e.target.value) }} className="px-2 py-1 w-auto rounded border-darken-4" />
                </div>
            </div>
        </div>
    );

    return (
        <>
            {show ? myChat : myBtn}
        </>
    );
}

export default ChatDialog;