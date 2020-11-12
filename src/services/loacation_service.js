import axios from "axios";
import authHeader from "./auth_header";
import jwt_decode from "jwt-decode";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://holbie.tech/api/v1/"
    : "http://localhost:5000/api/v1";

class LocationService {
  getCountries() {
    const api = [API_URL, "countries"].join("/");
    return axios.get(api, { headers: authHeader() });
  }
  getStates(country_id) {
    const api = [API_URL, country_id, "states"].join("/");
    return axios.get(api, { headers: authHeader() });
  }
}

export default new LocationService();
