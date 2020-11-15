/**
 * Recruiter service
 */

import axios from "axios";
import authHeader from "./auth_header";

const API_URL = "http://localhost:5000/api/v1";

/**
 * Recruiter service class
 */
class RecruiterService {
  /**
   * Get all recruiters
   * GET /api/v1/recruiters/:recruiter_id
   * @returns {Promise<AxiosResponse<any>>}
   */
  all() {
    const api = [API_URL, "recruiters"].join("/");
    return axios.get(api, { headers: authHeader() });
  }
  
  /**
   * Create a new recruiter associated to a given user
   * @param {object} data object of recruiter data
   * @param {string} userId user id
   * @returns {Promise<AxiosResponse<any>>}
   */
  create(data, userId) {
    const api = [API_URL, "recruiters"].join("/");
    data.user_id = userId
    return axios.post(api, data, { headers: authHeader() });
  }
  
  /**
   * Get a single recruiter
   * @param {string} recruiterID recruiter id
   * @returns {Promise<AxiosResponse<any>>}
   */
  get(recruiterID) {
    const api = [API_URL, "recruiters", recruiterID].join("/");
    return axios.get(api, { headers: authHeader() });
  }
  
  /**
   * Deletes recruiter based on given id
   * @param {string} recruiterID recruiter id
   * @returns {Promise<AxiosResponse<any>>}
   */
  delete(recruiterID) {
    const api = [API_URL, "recruiters", recruiterID].join("/");
    return axios.delete(api, { headers: authHeader() });
  }
  
  /**
   * Update a recruiter base on a given id
   * @param {object} data updated recruiter data
   * @param {string} recruiterID recruiter id
   * @returns {Promise<AxiosResponse<any>>}
   */
  update(data, recruiterID) {
    const api = [API_URL, "recruiters", recruiterID].join("/");
    return axios.put(api, data, { headers: authHeader() });
  }
  
  upload(data, recruiterID) {
    const api = [API_URL, recruiterID, "logo"].join("/");
    return axios.post(api, data, { headers: authHeader() });
  }
}

export default new RecruiterService();
