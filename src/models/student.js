export default class AStudent {
  constructor(
    first_name = '',
    last_name = '',
    middle_name = '',
    full_name = '',
    school_id = '',
    gender = '',
    phone_number = '',
    cin_number = '',
    passport_number = '',
    about_me = '',
    user_id = ''
  ) {
    this.first_name = first_name
    this.last_name = last_name
    this.middle_name = middle_name
    this.full_name = full_name
    this.school_id = school_id
    this.gender = gender
    this.phone_number = phone_number
    this.cin_number = cin_number
    this.passport_number = passport_number
    this.about_me = about_me
    this.user_id = user_id
  }
}