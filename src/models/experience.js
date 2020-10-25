export default class Experience {
  constructor(
    title = "",
    company = "",
    start_at = "",
    end_at = "",
    job_type = "",
    is_actual = false,
    description = ""
  ) {
    this.title = title
    this.company = company
    this.start_at = start_at
    this.end_at = end_at
    this.job_type = job_type
    this.is_actual = is_actual
    this.description = description
  }
}