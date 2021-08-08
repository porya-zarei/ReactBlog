const ContextMenu = ({show,xpos,ypos}) => {
    const xPos = xpos + "px";
    const yPos = ypos + "px";
    const cmStyle = {
        position: "absolute",
        height: "200px",
        width: "200px",
        top: xPos,
        left: yPos
    }
    console.log("cm =>>> ", cmStyle);
    return (
        <>
        </>
    );
}

export default ContextMenu;