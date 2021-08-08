const apiKey = "AIzaSyDb2MCOGgA-3M5VM9YDlbnGu5zIvGt0KOI";

const getState = async () => {
    return await (navigator.permissions.query({ name: "notifications" }).then(res => res.state).then(res => res));
}
var state = getState().then(res => res);
console.log("notification state => ", state);


const getSubscription = async () => {
    let registration = await navigator.serviceWorker.ready;
    let gs = await registration.pushManager.getSubscription();
    console.log(" = in get sub  ====> ", gs);
    return gs;
}

let subscriptionActive = null;
getSubscription().then(res => res).then(result => {
    subscriptionActive = result;
});

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const getPushSubcriprion = async () => {
    let registration = await navigator.serviceWorker.ready;
    const subscribeOption = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BAjGoEWrhiY8PM849ea4L2NkKsgnuxNGq15AshIfAC3If_Ko5uaXaIPDzf7IP7XHs1KO7Ss_rFbt16CzYmP1G4A")
    }
    let pushSubcribtion = await registration.pushManager.subscribe(subscribeOption);
    return pushSubcribtion;
}


if (subscriptionActive === null) {
    getPushSubcriprion().then(res => res).then(result => {
        subscriptionActive = result;
    });
}

const sendFirstNoti = async () => {

    if ("serviceWorker" in navigator && "PushManager" in window) {
        if (state !== "granted") {
            await Notification.requestPermission().then(result => {
                console.log("result in pushhh => ", result);
                state = result;
                console.log("stateeeeeeeeeeeeee =>", state);
            });
            console.log("statee ---");
            if (state === "granted") {
                await navigator.serviceWorker.ready.then(registeration => {
                    registeration.showNotification("ممنون !", {
                        body: "مرسی از اینکه دوباره به این وبسایت سر زدی 😜",
                        dir: "rtl",
                        icon: "./icon/pze.svg",
                        badge: "./icon/pze.svg",
                        actions:
                            [
                                {
                                    title: "View Site",
                                    "action": "visit-site"
                                },
                                {
                                    title: "View Profile",
                                    "action": "view-profile"
                                }

                            ]
                    });
                    // await getPushSubcriprion();
                    console.log("notification sended", getPushSubcriprion().then(res => res));
                });
            }
        }
    }
};

// sendFirstNoti().then(res => res);

