// const NotificationSender = async () => {

//     var state = await navigator.permissions.query({ name: "notifications" });

//     console.log("notification state => ", state);

//     if ("serviceWorker" in navigator && "PushManager" in window) {
//         if (state !== "granted") {
//             await Notification.requestPermission().then(result => {
//                 console.log("result in pushhh => ", result); state = result;
//             });
//             if (state === "granted") {
//                 await navigator.serviceWorker.ready.then(registeration => {
//                     registeration.showNotification("ممنون عزیزم!");
//                     console.log("not sended");
//                 });
//             }
//         }
//     }

// }

// export default NotificationSender;