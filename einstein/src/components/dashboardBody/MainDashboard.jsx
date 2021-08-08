import DashboardChart from '../../utils/DashboardChart';
import { useRecoilState } from "recoil";
import { statisticsData } from "../../recoil/atoms/statistics";
import { useEffect } from 'react';
import Charts from '../../utils/Charts';

const MainDashboard = () => {

    const [statis] = useRecoilState(statisticsData);

    useEffect((e, d) => {
        console.log("e # d => ", e, d);
        console.log("statis => in dash => ", statis);
    }, []);
    return (

        <div className="p-1 rounded row c-9 m-1 mt-3">

            <div className="row col-12 p-3 m-auto">

                <img className="card-img card-img-top post-img animate__animated animate__bounce" width="100%" height="400" src="../images/Illu/admin-chart.svg" alt="data" />

                <div className="row m-auto gap-2 justify-content-evenly align-items-center">
                    <Charts />
                </div>


                <div className="col-md-4 col-sm-12 my-2">
                    <div className="card w-100 h-100 shadow">
                        <div className="card-body">
                            <h3 className="card-title">بازدید ها</h3>
                            <p className="card-text">
                            text
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 col-sm-12 my-2">
                    <div className="card w-100 h-100 shadow">
                        <div className="card-body">
                            <h3 className="card-title">بازدید روز</h3>
                            <p className="card-text">{statis.DayVisits}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 col-sm-12 my-2">
                    <div className="card w-100 h-100 shadow">
                        <div className="card-body">
                            <h3 className="card-title">Title</h3>
                            <p className="card-text">Text</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-12 col-sm-12 my-2">
                    <div className="card w-100 h-100 shadow">
                        <div className="card-body">
                            <h3 className="card-title">بازدید ها</h3>
                            <div className="card-text">
                                <div className="badge bg-info text-black-50 m-1"> DayVisits: <span>{statis.DayVisits}</span></div>
                                <div className="badge bg-info text-black-50 m-1"> FBVisits: <span>{statis.FBVisits}</span></div>
                                <div className="badge bg-info text-black-50 m-1"> MounthVisits: <span>{statis.MounthVisits}</span></div>
                                <div className="badge bg-info text-black-50 m-1"> WeekVisits: <span>{statis.WeekVisits}</span></div>
                                <div className="badge bg-info text-black-50 m-1"> YearVisits: <span>{statis.YearVisits}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-sm-12 my-2">
                    <div className="card w-100 h-100 shadow">
                        <div className="card-body">
                            <h3 className="card-title">Title</h3>
                            <p className="card-text">Text</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-sm-12 my-2">
                    <div className="card w-100 h-100 shadow">
                        <div className="card-body">
                            <h3 className="card-title">Title</h3>
                            <p className="card-text">Text</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-12 col-sm-12 my-2">
                    <div className="card w-100 h-100 shadow">
                        <div className="card-body">
                            <h3 className="card-title">Title</h3>
                            <p className="card-text">Text</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default MainDashboard;