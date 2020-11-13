import axios from "axios";
import authHeader from "./auth_header";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://holbie.tech/api/v1/"
    : "http://localhost:5000/api/v1";

class JobService {
  getJobsByRecruiter(recruiter_id) {
    const api = [API_URL, recruiter_id, "jobs"].join("/");
    return axios.get(api, { headers: authHeader() });
  }
  
  job(id) {
    const api = [API_URL, "jobs", id].join("/");
    return axios.get(api, { headers: authHeader() });
  }
  
  getJobs() {
    const api = [API_URL, "jobs"].join("/");
    return axios.get(api, { headers: authHeader() });
  }
  
  create(data, recruiter_id) {
    const api = [API_URL, recruiter_id, "jobs"].join("/");
    return axios.post(api, data, { headers: authHeader() });
  }
  
  update(data, job_id) {
    const api = [API_URL, "jobs", job_id].join("/");
    return axios.put(api, data, { headers: authHeader() });
  }
}

export default new JobService();