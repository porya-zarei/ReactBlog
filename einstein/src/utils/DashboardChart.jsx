import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { useRecoilState } from 'recoil';
import { statisticsData } from '../recoil/atoms/statistics';


const DashboardChart = () => {

    const [statis, setStatis] = useRecoilState(statisticsData);

    console.log("statis in chart => ", statis)
    const chart1 = {
        labels: Object.keys(statis.WeekDetail),
        datasets: [
            {
                label: 'Visits',
                backgroundColor: 'rgba(20,15,180,1)',
                borderColor: '#000',
                borderWidth: 3,
                data: Object.values(statis.WeekDetail),
                borderCapStyle: "round",
            }
        ]
    }

    const chart2 = {
        labels: Object.keys(statis.WeekDetail),
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: 'rgba(75,19,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: Object.values(statis.WeekDetail),

            }
        ]
    }

    const monthData = {
        labels: Object.keys(statis.WeekDetail),
        datasets: [
            {
                label: 'week 4',
                data: statis.LastMonthWeeks[0],
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'week 3',
                data: statis.LastMonthWeeks[1],
                backgroundColor: 'rgb(54, 162, 235)',
            },
            {
                label: 'week 2',
                data: statis.LastMonthWeeks[2],
                backgroundColor: 'rgb(75, 192, 192)',
            }
        ]
    }

    const pieData = {
        labels: Object.keys(statis.WeekDetail),
        datasets: [
            {
                label: 'visits of app',
                data: Object.values(statis.WeekDetail),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    console.log("last month week detail => ",statis.LastMonthWeeks,monthData);

    return (
        <>
            <div className="col-md-12 col-lg-12 h-400px col-sm-12 c-1 rounded-2 bg-dark">
                <Bar type="bar" data={monthData} />
            </div>
            <div className="col-md-5 col-lg-5 col-sm-12 c-1 rounded-2 bg-dark">
                <Bar
                    data={chart1}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }, defaultColor: "#fff",
                        responsive: true,
                        tooltips: { bodyFontColor: "#ffffff", borderColor: "white", backgroundColor: "yellow !important" }
                    }}
                />
            </div>
            <div className="col-md-5 col-lg-5 col-sm-12 c-1 rounded-2 bg-dark">
                <Line
                    data={chart2}
                    options={{
                        title: {
                            display: true,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
            <div className="col-md-5 col-lg-5 col-sm-12 c-1 rounded-2 bg-dark">
                <Pie
                    data={pieData}
                />
            </div>
            <div className="col-md-5 col-lg-5 col-sm-12 c-1 rounded-2 bg-dark">
                <Doughnut
                    data={pieData}
                />
            </div>
        </>
    );
}

export default DashboardChart;