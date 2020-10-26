export default class Address {
  constructor(
    first_line = "",
    second_line = "",
    city = "",
    zip_code = "",
    state_id = "",
    country = ""
  ) {
    this.first_line = first_line;
    this.second_line = second_line;
    this.city = city;
    this.zip_code = zip_code;
    this.state_id = state_id;
    this.contry = country;
  }
}
