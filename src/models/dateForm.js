export default class DateForm {
  constructor(
    day = 1,
    month = 1,
    year = 1900
  ) {
    this.day = day
    this.month = month
    this.year = year
  }

  dateToString() {
    return [
      this.year.toString(),
      this.month.toString(),
      this.day.toString()
    ].join('-')
  }
}