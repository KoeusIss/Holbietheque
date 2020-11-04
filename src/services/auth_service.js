/**
 * Authentication service
 */
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/v1'

/**
 * AuthService class
 */
class AuthService {
  /**
   * login service: sends and api post request to the server and receive
   * and access token, which will save it it the local storage
   * @param {object} user
   * @returns {Promise<AxiosResponse<any>>}
   */
  async login(user) {
    /* POST uri/login?email=user.email&password=user.password */
    const uri = [API_URL, 'login'].join('/')
    const response = await axios
      .post(uri, {
        email: user.email,
        password: user.password
      })
    if (response.data.success) {
      localStorage.setItem('access_token', response.data.access_token)
    }
    return response
  }
  
  /**
   * signup is registering service sends newly created user to the server
   * and receive a response back contains the newly created ID
   * @param {object} user
   * @returns {Promise<AxiosResponse<any>>}
   */
  async signup(user) {
    /* POST uri/signup?email=user.email&password=user.password&role=user.role */
    const uri = [API_URL, 'signup'].join('/')
    const response = await axios
      .post(uri, {
        email: user.email,
        password: user.password,
        role: user.role
      })
    if (response.data.success) {
      localStorage.setItem('id', response.data.id)
    }
    return response
  }
  
  /**
   * verify service is for email verification
   * @param {string} value
   * @returns {Promise<AxiosResponse<any>>}
   */
  async verify(value) {
    let id = localStorage.getItem("id")
    const uri = [API_URL, 'verification'].join('/')
    return await axios
      .post(uri, {
        otp: value.otp,
        id: id
      })
  }
}

export default new AuthService()