import axios from "axios";

const API_URL = "/api/auth/";

class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.clear();
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    isLoggedIn() {
        let user = this.getCurrentUser();
        return !!user && !!user.accessToken;
    }

    checkLevel(level) {
        let user = this.getCurrentUser();
        let middle = false;

        switch (level) {
            case 'ROLE_ADMIN':
                middle = user.roles.includes(level);
                break;
            case 'ROLE_MENTOR':
            case 'ROLE_SENIOR':
                middle = user.roles.includes(level)
                    || user.roles.includes('ROLE_ADMIN');
                break;
            case 'ROLE_USER':
                middle = user.roles.includes(level)
                    || user.roles.includes('ROLE_MENTOR')
                    || user.roles.includes('ROLE_SENIOR')
                    || user.roles.includes('ROLE_ADMIN');
                break;
        }
        return this.isLoggedIn() && middle;
    }
}

export default new AuthService();