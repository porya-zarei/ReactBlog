const ChatAlert = ({ text, color = "primary" }) => {
    const c = `alert alert-${color} p-1 m-1 animate__animated animate__fadeIn`
    return (
        <li className={c}>{text}</li>
    );
}
export default ChatAlert;