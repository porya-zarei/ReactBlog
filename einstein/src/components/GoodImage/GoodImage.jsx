import { CDNImage } from "../../services/config.json"
import Resizer from "react-image-file-resizer";
import http from "../../services/httpService";
import useCurrentWidth from "../../utils/windowWidth";
import { useEffect } from "react";

const GoodImage = ({ post, name, compressFormat, maxHeight, quality }) => {

    const width = useCurrentWidth();
    const src = `${CDNImage}/${name}`;
    const maxWidth = width;
    var image = null;
    var file = null;
    var source = Resizer.imageFileResizer(
        file, // Is the file of the image which will resized.
        maxWidth, // Is the maxWidth of the resized new image.
        maxHeight, // Is the maxHeight of the resized new image.
        compressFormat, // Is the compressFormat of the resized new image.
        quality, // Is the quality of the resized new image.
        () => { }, // Is the callBack function of the resized new image URI.
        "jpg"
    );
    //<img src={source} alt="" />
    useEffect(() => {
        console.log("res in good => ", source);
    }, [])
    return (null);
}

export default GoodImage;