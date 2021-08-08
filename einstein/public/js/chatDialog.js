// Functionality Programing :)
var btn_close = document.getElementById("btn-cl");
var btn_open = document.getElementById("btn-op");
var chat_content = document.getElementById("chat-content");
var ul = document.getElementById("chat-content-ul");
var chat = document.getElementById("my-chat");
var btnz = document.getElementsByClassName("btnz");
var newUl = document.createElement("ul");

const btns = [`<li class="li-btnz"><button class="btn btn-block m-1 btn-primary btnz" onclick="btnDialog(this)">چطوری ؟؟</button></li>`,
    `<li class="li-btnz"><button class="btn btn-block m-1 btn-primary btnz" onclick="btnDialog(this)">ایدی تلگرام من؟</button></li>`,
    `<li class="li-btnz"><button class="btn btn-block m-1 btn-primary btnz" onclick="btnDialog(this)">اهل کجایی؟؟</button></li>`];


newUl.className = "chat-c-u";
console.log(btnz[0]);

function addBtnz(ul) {

    for (let index = 0; index < 3; index++) {



        var newLi = document.createElement("li");
        newLi.className = "li-btnz";

        newLi.innerHTML = btns[index];
        ul.appendChild(newLi);
        console.log('newUl :>> ', ul);

    }
}

function deleteBtnz(ul) {

    for (let j = 0; j < ul.children.length; j++) {
        if (ul.children[j].className == "li-btnz") {
            ul.removeChild(ul.children[j]);
        }
    }

}


function openMyDialog() {
    chat.style.display = "block";
    btn_open.style.display = "none";
}

function closeMyDialog() {
    chat.style.display = "none";
    btn_open.style.display = "block";
}

function btnDialog(element) {
    var text = element.innerText;
    switch (text) {
        case "اهل کجایی؟؟":
            deleteBtnz(newUl);
            setTimeout(
                () => {

                    addBtnz(newUl);
                }, 1000);
            deleteBtnz(newUl);
            var newLi_q = document.createElement("li");
            newLi_q.className = "alert alert-primary p-1 m-1";
            newLi_q.innerText = "من اهل نیشابورم";
            var newLi_a = document.createElement("li");
            newLi_a.className = "alert alert-danger p-1 m-1";
            newLi_a.innerText = text;
            newUl.appendChild(newLi_a);
            newUl.appendChild(newLi_q);

            chat_content.replaceChild(newUl, ul);



            break;

        case "چطوری ؟؟":
            deleteBtnz(newUl);
            setTimeout(
                () => {

                    addBtnz(newUl);
                }, 1000);
            deleteBtnz(newUl);
            var newLi_q = document.createElement("li");
            newLi_q.className = "alert alert-primary p-1 m-1";
            newLi_q.innerText = "خوب خوب 😉";
            var newLi_a = document.createElement("li");
            newLi_a.className = "alert alert-danger p-1 m-1";
            newLi_a.innerText = text;
            newUl.appendChild(newLi_a);
            newUl.appendChild(newLi_q);

            chat_content.replaceChild(newUl, ul);



            break;

        case "ایدی تلگرام من؟":
            deleteBtnz(newUl);
            setTimeout(
                () => {

                    addBtnz(newUl);
                }, 1000);
            deleteBtnz(newUl);
            var newLi_q = document.createElement("li");
            newLi_q.className = "alert alert-primary p-1 m-1";
            newLi_q.innerText = "@pzeinstein";
            var newLi_a = document.createElement("li");
            newLi_a.className = "alert alert-danger p-1 m-1";
            newLi_a.innerText = text;
            newUl.appendChild(newLi_a);
            newUl.appendChild(newLi_q);

            chat_content.replaceChild(newUl, ul);



            break;

        default:
            break;
    }
}


