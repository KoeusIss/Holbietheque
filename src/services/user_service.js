import axios from "axios";
import authHeader from "./auth_header";
import jwt_decode from "jwt-decode";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://holbie.tech/api/v1/"
    : "http://localhost:5000/api/v1"

class UserService {
  getStudentByUser(user_id) {
    return axios
      .get(API_URL + '/users/' + user_id + '/student', {headers: authHeader()})
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

  postStudentCertificate(cert, id) {
    return axios
      .post(API_URL + '/' + id + '/certificates',
        {
          name: cert.name,
          authority: cert.authority,
          is_expire: cert.is_expire,
          issued_at: cert.issued_at,
          expired_at: cert.expired_at,
          certificate_id: cert.certificate_id,
          description: cert.description
        },
        {headers: authHeader()})
  }

  getStudentCertificates(student_id) {
    const api = API_URL + '/' + student_id + '/certificates'
    return axios
      .get(api, {headers: authHeader()})
  }

  getStudentEducation(student_id) {
    const api = API_URL + '/' + student_id + '/educations'
    return axios
      .get(api, {headers: authHeader()})
  }

  postStudentEducation(education, id) {
    return axios
      .post(API_URL + '/' + id + '/educations',
        {
          degree: education.degree,
          school: education.school,
          major: education.major,
          start_at: education.start_at,
          end_at: education.end_at,
          is_finished: education.is_finished,
          grade: education.grade,
          description: education.description
        },
        {headers: authHeader()})
  }
  postStudentExperience(experience, id) {
    return axios
      .post(API_URL + '/' + id + '/experiences',
        {
          title: experience.title,
          company: experience.company,
          job_type: experience.job_type,
          start_at: experience.start_at,
          end_at: experience.end_at,
          is_actual: experience.is_actual,
          description: experience.description
        },
        {headers: authHeader()})
  }
  getStudentExperience(student_id) {
    const api = API_URL + '/' + student_id + '/experiences'
    return axios
      .get(api, {headers: authHeader()})
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
