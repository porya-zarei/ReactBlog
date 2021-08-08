import {atom} from "recoil";
import {getStatisticsFullData} from "../../services/statisticService";

const statisticsData = atom({
    key: "statisticsData",
    default: getStatisticsFullData().then((r) => r.data),
});

export {statisticsData};
