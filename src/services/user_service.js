import axios from "axios";
import authHeader from "./auth_header";
import jwt_decode from "jwt-decode";

const API_URL =
    process.env.NODE_ENV === "production"
        ? "https://holbie.tech/api/v1/"
        : "http://localhost:5000/api/v1"

class UserService {
    getStudent(student_id) {
        return axios
            .get(API_URL + '/students/' + student_id, {headers: authHeader()})
    }

    postStudentProfile(student, user_id) {
        return axios
            .post(API_URL + '/students',
                {
                    first_name: student.first_name,
                    last_name: student.last_name,
                    middle_name: student.middle_name,
                    gender: student.gender,
                    school_id: student.school_id,
                    cin_number: student.cin_number,
                    passport_number: student.passport_number,
                    about_me: student.about_me,
                    user_id: user_id
                },
                {headers: authHeader()})
    }

    currentUser() {
        const token = localStorage.getItem('access_token')
        if (token) {
            const decoded = jwt_decode(token)
            if (decoded.identity) {
                return {id: decoded.identity, role: decoded.user_claims.role}
            } else {
                return null
            }
        }
        return null
    }
}

export default new UserService();
