/**
 * Recruiter model
 */
class Recruiter {
  constructor(
    name = "",
    description = "",
    web_site = "",
    headquarter = "",
    company_size = "",
    founded = "",
    logo = "",
    about = "",
    our_mission = "",
    core_values = "",
    interview_process = "",
  ) {
    this.name = name
    this.description = description
    this.web_site = web_site
    this.headquarter = headquarter
    this.company_size = company_size
    this.founded = founded
    this.logo = logo
    this.about = about
    this.our_mission = our_mission
    this.core_values = core_values
    this.interview_process = interview_process
  }
}

export default Recruiter