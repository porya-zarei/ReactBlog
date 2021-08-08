const TopParallaxContent = () => {
    return (
        <div className="row p-3 mt-5 center" style={{
            height: '100vh',
            textAlign: "center"
        }}>
            <div className="h-100 w-100 row justify-content-evenly p-2 m-0 align-items-center">
                <div className="col-3 h-50 p-2 rounded-2">
                    <div className="row justify-content-center align-items-center h-100 w-100">
                        <img src="./images/illu/astronaut.svg" height="70px" className="floating-1" alt="meteor" />
                    </div>
                </div>
                <div className="col-3 h-50 hide-xs p-2 rounded-2">
                    <div className="row justify-content-center align-items-center h-100 w-100">
                        <img src="./images/illu/meteor.svg" height="70px" className="floating-2" alt="meteor" />
                    </div>
                </div>
                <div className="col-3 h-50 hide-sm hide-xs p-2 rounded-2">
                    <div className="row justify-content-center align-items-center h-100 w-100">
                        <img src="./images/illu/startup.svg" height="70px" className="floating-rocket" alt="meteor" />
                    </div>
                </div>
                <div className="divider my-1"></div>
                <div className="col-3 h-50 p-2 rounded-2">
                    <div className="row justify-content-center align-items-center h-100 w-100">
                        <img src="./images/illu/blackhole.svg" height="70px" className="rotating-1" alt="meteor" />
                    </div>
                </div>
                <div className="col-3 h-50 hide-xs p-2 rounded-2">
                    <div className="row justify-content-center align-items-center h-100 w-100">
                        <img src="./images/illu/meteor.svg" height="70px" className="floating-1" alt="meteor" />
                    </div>
                </div>
                <div className="col-3 h-50 hide-sm hide-xs p-2 rounded-2">
                    <div className="row justify-content-center align-items-center h-100 w-100">
                        <img src="./images/illu/meteor.svg" height="70px" className="floating-2" alt="meteor" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopParallaxContent;