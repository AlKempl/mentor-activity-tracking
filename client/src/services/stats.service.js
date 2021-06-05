import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/stats/';

class StatsService {
    getStatsData() {
        return axios.get(API_URL,{headers: authHeader()});
    }
}

export default new StatsService();