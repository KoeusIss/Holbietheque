export default class Education {
  constructor(
    degree = "",
    school = "",
    major = "",
    grade = "",
    start_at_month = "",
    start_at_year = "",
    end_at_month = "",
    end_at_year = "",
    is_finished = false,
    description = ""
  ) {
    this.degree = degree;
    this.school = school;
    this.major = major;
    this.grade = grade;
    this.start_at_month = start_at_month;
    this.start_at_year = start_at_month;
    this.end_at_month = end_at_month;
    this.end_at_year = end_at_year;
    this.is_finished = is_finished;
    this.description = description;
  }
}
