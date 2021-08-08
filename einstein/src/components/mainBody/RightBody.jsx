import { lazy, Suspense, useState } from "react";
import MusicPlayer from "../musicPlayer/MusicPlayer";


const RightBody = () => {

    const DayVisitSite = lazy(() => import("../banner/DayVisitSite"));

    const [date] = useState(Date(Date.now).substr(0, 25));

    const loading = (
        <div className="card text-white bg-indigo my-2">

            <img id="site-admin" className="card-img card-img-top" width="100%" height="200" src="../images/Illu/site-stats-bro-sec.svg" alt="site-status" />
            <div className="card-body">
                <h4 className="card-title">بازدید امروز</h4>
                <p className="card-text">
                    <div className="fa fa-eye-fill">wait</div>
                </p>
            </div>

        </div>
    );

    return (
        <div id="right-b" className="bg-light right-body card p-0 text-center border-0">
            {/* <label className="p-1 mb-2 text-dark display-6 card-header card-title"> ساید بار </label> */}

            <div className="card text-white bg-primary my-2">

                <img className="card-img card-img-top" width="100%" height="200" src="../images/Illu/time.svg" alt="time" />
                <div className="card-body">
                    <p className="card-text">
                        <div className="">{date}</div>
                    </p>
                </div>

            </div>

            <Suspense fallback={loading}>
                <DayVisitSite />
            </Suspense>

            <div className="card border-0 text-white bg-dark my-2">

                <MusicPlayer />

            </div>


        </div>
    );
}

export default RightBody;