// Student attribute service

import axios from "axios";
import authHeader from "./auth_header";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://holbie.tech/api/v1/"
    : "http://localhost:5000/api/v1";

class StudentService {
  constructor(name) {
    this.name = name;
  }

  all(id) {
    const api = [API_URL, id, this.name].join("/");
    return axios.get(api, { headers: authHeader() });
  }

  create(data, id) {
    const api = [API_URL, id, this.name].join("/");
    return axios.post(api, data, { headers: authHeader() });
  }

  get(id) {
    const api = [API_URL, this.name, id].join("/");
    return axios.get(api, { headers: authHeader() });
  }

  delete(id) {
    const api = [API_URL, this.name, id].join("/");
    return axios.delete(api, { headers: authHeader() });
  }

  update(data) {
    const api = [API_URL, this.name, data.id].join("/");
    return axios.put(api, data, { headers: authHeader() });
  }
}

export default StudentService;
