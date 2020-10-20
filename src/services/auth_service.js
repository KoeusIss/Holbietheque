import axios from 'axios'

const API_URL = 'http://localhost:5000/api/v1'
class AuthService {
    // login function (user) -> res.data
    login (user) {
        return axios
            .post(API_URL + '/login', {
                email: user.email,
                password: user.password
            })
            .then((res) => {
                if (res.data.access_token) {
                    localStorage.setItem('access_token', res.data.access_token)
                }
                return res.data
            })
    }
    // signup function (user) -> res.data
    signup(user) {
        return axios
            .post(API_URL + '/signup', {
                email: user.email,
                password: user.password,
                role: user.role
            })
    }
}

export default new AuthService()