import axios from "axios";
import authHeader from "./auth_header";
import jwt_decode from "jwt-decode";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://holbie.tech/api/v1/"
    : "http://localhost:5000/api/v1";

class UserService {
  student(id) {
    const api = [API_URL, "students", id].join("/");
    return axios.get(api, { headers: authHeader() });
  }

  students() {
    const api = [API_URL, "students"].join("/");
    return axios.get(api, { headers: authHeader() });
  }

  create(data, user_id) {
    const api = [API_URL, "students"].join("/");
    data.user_id = user_id;
    data.date_of_birth = [
      data.birth_year,
      data.birth_month,
      data.birth_day,
    ].join("-");
    return axios.post(api, data, { headers: authHeader() });
  }

  currentUser() {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.identity) {
        return {
          id: decoded.identity,
          role: decoded.user_claims.role,
          profile: decoded.user_claims.profile,
        };
      } else {
        return null;
      }
    }
    return null;
  }
}

export default new UserService();
