export default class AStudent {
  constructor(
    first_name = '',
    last_name = '',
    middle_name = '',
    full_name = '',
    birth_day = '',
    birth_month = '',
    birth_year = '',
    school_id = '',
    gender = '',
    marital_status = '',
    cin_number = '',
    passport_number = '',
    about_me = '',
    user_id = ''
  ) {
    this.first_name = first_name
    this.last_name = last_name
    this.middle_name = middle_name
    this.full_name = full_name
    this.birth_day = birth_day
    this.birth_month = birth_month
    this.birth_year = birth_year
    this.school_id = school_id
    this.gender = gender
    this.marital_status = marital_status
    this.cin_number = cin_number
    this.passport_number = passport_number
    this.about_me = about_me
    this.user_id = user_id
  }
}