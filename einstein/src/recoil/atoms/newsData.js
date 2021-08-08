import { atom } from "recoil";
// import { getData } from "../../services/newsData";

const article =
{
    author: null,
    content: "CUPERTINO, Calif. (AP) Apple is urging iPhone and iPad users to update their devices to fix security flaws that might have been actively exploited by hackers.↵Apple made the software upgrades availa…[+482 chars]",
    description: "CUPERTINO, Calif. (AP) — Apple is urging iPhone and iPad users to update their devices to fix security flaws that might have been 'actively exploited' by hackers.Apple made the software...",
    publishedAt: "2021-01-27T18:17:06Z",
    source: { id: "associated-press", name: "Associated Press" },
    title: "Apple urges security upgrade to iPhones, iPads - Associated Press",
    url: "https://apnews.com/article/apple-security-upgrade-iphones-ipads-93ab77127541446a53748559f735de18",
    urlToImage: "https://storage.googleapis.com/afs-prod/media/7b930525f32e4e9999d3b46c725e893d/3000.jpeg",
};

const newsData = atom({
    key: "newsData",
});

export { newsData };