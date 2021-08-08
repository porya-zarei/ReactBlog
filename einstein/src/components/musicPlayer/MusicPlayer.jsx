import { useEffect, useRef, useState } from "react";
import jsmediatags from "jsmediatags";
import { CDNMusics } from "../../services/config.json";

const MusicPlayer = () => {

    const sources = [`${CDNMusics}/2.mp3`, `${CDNMusics}/3.mp3`];
    const [index, setIndex] = useState(0);
    const [src, setSrc] = useState(sources[index]);
    // const [volume, setVolume] = useState();
    const volumeTag = useRef();
    const [play, setPlay] = useState(false);
    const audioeTag = useRef();
    const imageTag = useRef();

    const playSong = async () => {
        if (!play) {
            await audioeTag.current.play();
            await setImage(src);

            // else {
            //     document.getElementById('picture').style.display = "none";
            // }
            console.log(audioeTag.current);
        }
        else {
            await audioeTag.current.pause();
        }
        await setPlay(last => !last);
    }
    const changeSongNext = async () => {
        await audioeTag.current.pause();
        if (index < sources.length - 1) {
            await setIndex(i => i + 1);
        }
        else {
            await setIndex(Number("0"));
        }

        await setSrc(sources[index]);
        await setImage(src);
        await audioeTag.current.play();
        console.log(index);
    }

    const changeSongPrevious = async () => {
        await audioeTag.current.pause();
        if (index > 0) {
            await setIndex(i => i - 1);
        }
        else {
            await setIndex(Number(sources.length - 1));
        }
        await setSrc(sources[index]);
        await setImage(src);
        await audioeTag.current.play();
        console.log(index);
    }
    const changeVolume = () => {
        audioeTag.current.volume = (volumeTag.current.value / 100);
    }

    const setImage = async (s) => {
        var pic;
        if (s) {
            // s = "http://localhost:3000" + (s.slice(2));
            console.log("address in set image for music => ",s);
            await new jsmediatags.Reader(s)
                // .setTagsToRead(["COMM", "TCON", "WXXX"])
                .read({
                    onSuccess: async (tag) => {
                        console.log(tag.tags);
                        pic = tag.tags.picture;
                        console.log(pic);

                        if (pic) {
                            var base64String = "";
                            for (var i = 0; i < pic.data.length; i++) {
                                base64String += String.fromCharCode(pic.data[i]);
                            }
                            var base64 = "data:" + pic.format + ";base64," +
                                window.btoa(base64String);
                            await (imageTag.current.src = base64);
                            console.log(imageTag.current);
                        }
                    },
                    onError: function (err) {
                        console.log("error in set img", err);
                    }
                });
        }

    }
    useEffect(() => {

    }, [])
    return (
        <>
            <div className="h-100 card bg-transparent border-0 px-3">
                <div className="card-body w-100 mb-0 pb-0">
                    <img ref={imageTag} className="card-img card-img-top card-img-100" src="../images/Illu/music-player.svg" alt="cover" />
                    <audio ref={audioeTag} id="sound-play" className="card-subtitle w-100 rounded-top bg-light r-audio" src={src} />
                </div>
                <div className="card-footer text-center p-0 mt-0">
                    <div className="display-f row">
                        <div className="col-11 row">
                            <button onClick={() => { changeSongNext().then() }} className="btn btn-sm btn-secondary rounded-0 col-4"  >
                                <i className="bi bi-caret-right-fill"></i>
                            </button>
                            <button onClick={() => { playSong().then() }} className="btn btn-sm btn-secondary rounded-0 col-4"  >
                                <i className={`bi bi-${play ? "pause-fill" : "play-fill"}`}></i>
                            </button>
                            <button onClick={() => { changeSongPrevious().then() }} className="btn btn-sm btn-secondary rounded-0 col-4" >
                                <i className="bi bi-caret-left-fill"></i>
                            </button>
                        </div>
                        <div className="col-12 mx-1">
                            <input ref={volumeTag} title="volume" className="input w-100" type="range" max="100" min="0" onChange={changeVolume} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default MusicPlayer;