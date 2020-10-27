export default class Project {
  constructor(
    name = "",
    start_at = "",
    end_at = "",
    status = "",
    url = "",
    github_link = "",
    description = ""
  ) {
    this.name = name
    this.start_at = start_at
    this.end_at = end_at
    this.status = status
    this.url = url
    this.github_link = github_link
    this.description = description
  }
}