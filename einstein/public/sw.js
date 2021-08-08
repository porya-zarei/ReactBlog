let CACHE_VERSION = "1.9";

let CACHE_NAMES =
{
    static: "static-cache-v" + CACHE_VERSION,
    dynamic: "dynamic-cache-v" + CACHE_VERSION
};

const cacheFile =
    [
        '/',
        '/css/bootstrap.min.css',
        '/css/chatDialog.css',
        '/css/dashboard.css',
        '/css/font-awesome-new.min.css',
        '/css/ReactToastify.min.css',
        '/css/style.css',
        '/css/font-awesome-old.min.css',
        // '/css/',
        '/js/jquery.min.js',
        '/js/bootstrap.min.js',
        '/js/bootstrap.bundle.js',
        '/js/Chart.min.js',
        '/js/chatDialog.js',
        '/js/dashboard.js',
        '/js/jquery-3.5.1.slim.min.js',
        '/js/jquery-3.5.1.min.js',
        '/js/main.js',
        '/js/feather.min.js',
        // '/js/'
    ];

self.addEventListener('install', (event) => {
    console.log("in install => ev ", event);
    event.waitUntil(
        caches.open(CACHE_NAMES.static).then((cache) => {

            cache.addAll(cacheFile);

        })
    );
});

self.addEventListener("activate", (event) => {
    console.log("sw in act", event);
    let expectedCache = Object.values(CACHE_NAMES);
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            // return Promise.all(
            //     () => {

            //     }
            // );
            cacheNames.forEach(cacheName => {
                if (!expectedCache.includes(cacheName)) {
                    console.log("deeeeelllliting!!!!!!!!!");
                    return caches.delete(cacheName);
                }
            });
        })
    );
});

self.addEventListener("fetch", (event) => {
    return event.respondWith(
        fetch(event.request)
            .then(res => {
                return caches.open(CACHE_NAMES.dynamic).then(cache => {
                    cache.put(event.request, res.clone());
                    return res;
                });
            })
            .catch(err => {
                return caches.match(event.request).catch(() => {
                    // prompt("کاربر عزیز این بخش قبلا بازدبد نشده و شما افلاین هستید !");
                    // window.location.replace("/");
                });
            })
    );
});



self.addEventListener("notificationclick", event => {
    let notification = event.notification;
    let action = event.action;
    let promiseChain;
    console.log("notification click =>", notification, action);
    notification.close();

    switch (action) {
        case "visit-site":
            promiseChain = clients.openWindow("/");
            break;
        case "view-profile":
            promiseChain = clients.openWindow("/profile");
            break;
        default:
            promiseChain = clients.openWindow("/");
            break;
    }
    event.waitUntil(promiseChain);
});



// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.


/*//?  self.addEventListener('sync', (event) => {
    if (event.tag == "contactme-task") {
        event.waitUntil(
            () => {

                localForage.getItem("contactList").then(messages => {

                    messages.forEach(message => {

                        var result = await contactMe(message);

                        console.log("status => ", result, "data in footer =>");

                        if (result.status == 200) {

                            toast.success("ارسال شد دوست عزیز");

                        }
                    });


                });


                localForage.removeItem("contactList");
            }
        );
    }
});*/
