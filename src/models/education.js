export default class Education {
  constructor(
    degree = "",
    school = "",
    major = "",
    grade = "",
    start_at = "",
    end_at = "",
    is_finished = false,
    description = ""
  ) {
    this.degree = degree;
    this.school = school;
    this.major = major;
    this.grade = grade;
    this.start_at = start_at;
    this.end_at = end_at;
    this.is_finished = is_finished;
    this.description = description;
  }
}
