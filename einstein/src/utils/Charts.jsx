import { useRecoilState } from 'recoil';
import { statisticsData } from '../recoil/atoms/statistics';
import { LineChart, Line, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';


const Charts = () => {

    const [statis, setStatis] = useRecoilState(statisticsData);
    console.log("statis in chart => ", statis);

    const colors = ["blue", "red", "yellow", "green"];
    const ids = ["gr-1", "gr-2", "gr-3", "gr-4"];

    const [dataOfMonth, setDataOfMonth] = useState([]);
    const [lastWeekData, setLastWeekData] = useState([]);

    const addMonthData = () => {
        let maindata = [];
        let w = 0;
        statis.LastMonthWeeks.forEach(week => {
            let data = [];
            w++;
            console.log("week in dash chart => ", week);
            for (var k in (week)) {
                console.log(" k % v => ", k, Number(week[k]));
                data.push({ day: String(k), visit: Number(week[k]) });
            };
            const objectData = {
                name: `week ${w}`,
                data: data
            }
            maindata.push(objectData);
        });
        console.log("data in charts => ", maindata);
        setDataOfMonth(maindata);
    }

    const addLastWeekData = () => {
        let data = [];
        let week = statis.WeekDetail;
        for (var k in week) {
            console.log(" k % v => ", k, Number([k]));
            data.push({ day: String(k), visit: Number(week[k]) });
        };
        setLastWeekData(data);
    }

    useEffect(() => {
        addMonthData();
        addLastWeekData();
    }, []);

    return (
        <div className="container-fluid row justify-content-center align-items-center">
            <div className="col-12 center p-2 align-self-center">
                <AreaChart className="center" width={800} height={350}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        {ids.map((id, i) =>
                        (
                            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={colors[i]} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={colors[i]} stopOpacity={0} />
                            </linearGradient>
                        )
                        )}
                    </defs>
                    <XAxis allowDuplicatedCategory={false} dataKey="day" />
                    <YAxis dataKey="visit" />
                    <Tooltip />
                    {dataOfMonth.map((s, i) => (
                        <Area type="monotone" dataKey="visit" data={s.data} name={s.name} key={s.name} stroke="#8884d8" fillOpacity={1} fill={`url(#${ids[i]})`} />
                    ))}
                </AreaChart>
            </div>
            <div className="col-12 align-self-center center p-2 bg-indigo bg-gradient rounded rounded-3 row justify-content-evenly align-items-center">
                <ResponsiveContainer width="100%" height="400px" minWidth="100px" maxHeight="400px" debounce={5}>
                    <PieChart className="center bg-secondary" width={400} height={400}>
                        <Pie data={lastWeekData} dataKey="visit" nameKey="day" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Charts;