import axios from "axios";
import authHeader from './auth-header';

const API_URL = "/api/admin/users/";

class AdminUsersService {
    list() {
        return axios.get(API_URL + "", {headers: authHeader()});
    }

    updateOne(id, email, roles, enabled) {
        return axios.post(API_URL + id, {email, roles, enabled}, {headers: authHeader()});
    }

    deleteOne(id) {
        return axios.delete(API_URL + id, {headers: authHeader()});
    }

    add(username, password, email, roles, enabled) {
        return axios.post(API_URL, {username, password, email, roles, enabled},{headers: authHeader()});
    }
}

export default new AdminUsersService();