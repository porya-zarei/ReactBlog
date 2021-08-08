import {StrictMode} from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import App from "./App";
import {store} from "./redux/store";
import {RecoilRoot} from "recoil";

render(
    <StrictMode>
        <Provider store={store}>
            <RecoilRoot>
                <App />
            </RecoilRoot>
        </Provider>
    </StrictMode>,
    document.getElementById("root"),
);
