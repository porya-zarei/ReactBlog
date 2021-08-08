import http from "./httpService";
import config from "./config.json";

export const getStatisticsFullData = async () => {
    return http.get(`${config.api}/statistics/Full`);
}