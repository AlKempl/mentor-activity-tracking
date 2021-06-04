import axios from "axios";
import authHeader from './auth-header';

const API_URL = "/api/admin/users/";

class AdminUsersService {
    list() {
        return axios.get(API_URL + "", {headers: authHeader()});
    }
}

export default new AdminUsersService();