import axios from "axios";
import authHeader from './auth-header';

const API_URL = "/api/mod/lessons/";

class ModLessonsService {
    list() {
        return axios.get(API_URL + "", {headers: authHeader()});
    }

    updateOne(id, name, description, active) {
        return axios.post(API_URL + id, {name, description, active}, {headers: authHeader()});
    }

    deleteOne(id) {
        return axios.delete(API_URL + id, {headers: authHeader()});
    }

    add(name, description, active) {
        return axios.post(API_URL, {name, description, active},{headers: authHeader()});
    }
}

export default new ModLessonsService();