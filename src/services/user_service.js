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

  postStudentCertificate(cert, id) {
    return axios.post(
      API_URL + "/" + id + "/certificates",
      {
        name: cert.name,
        authority: cert.authority,
        is_expire: cert.is_expire,
        issued_at: cert.issued_at,
        expired_at: cert.expired_at,
        certificate_id: cert.certificate_id,
        description: cert.description,
      },
      { headers: authHeader() }
    );
  }

  getStudentCertificates(student_id) {
    const api = API_URL + "/" + student_id + "/certificates";
    return axios.get(api, { headers: authHeader() });
  }

  getStudentEducation(student_id) {
    const api = API_URL + "/" + student_id + "/educations";
    return axios.get(api, { headers: authHeader() });
  }

  postStudentEducation(education, id) {
    return axios.post(
      API_URL + "/" + id + "/educations",
      {
        degree: education.degree,
        school: education.school,
        major: education.major,
        start_at: education.start_at,
        end_at: education.end_at,
        is_finished: education.is_finished,
        grade: education.grade,
        description: education.description,
      },
      { headers: authHeader() }
    );
  }
  postStudentExperience(experience, id) {
    return axios.post(
      API_URL + "/" + id + "/experiences",
      {
        title: experience.title,
        company: experience.company,
        job_type: experience.job_type,
        start_at: experience.start_at,
        end_at: experience.end_at,
        is_actual: experience.is_actual,
        description: experience.description,
      },
      { headers: authHeader() }
    );
  }
  getStudentExperience(student_id) {
    const api = API_URL + "/" + student_id + "/experiences";
    return axios.get(api, { headers: authHeader() });
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
