const genderOptions = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const maritalStatus = [
  { key: "m", text: "Married", value: "married" },
  { key: "s", text: "Single", value: "single" },
  { key: "o", text: "Other", value: "other" },
];

const days = [];
let d = 1;
while (d < 32) {
  days.push({ key: d, text: d.toString(), value: d.toString() });
  d++;
}

const months = [
  { key: "1", text: "January", value: "01" },
  { key: "2", text: "February", value: "02" },
  { key: "3", text: "March", value: "03" },
  { key: "4", text: "April", value: "04" },
  { key: "5", text: "May", value: "05" },
  { key: "6", text: "June", value: "06" },
  { key: "7", text: "July", value: "07" },
  { key: "8", text: "August", value: "08" },
  { key: "9", text: "September", value: "09" },
  { key: "10", text: "October", value: "10" },
  { key: "11", text: "November", value: "11" },
  { key: "12", text: "December", value: "12" },
];

const years = [];
let y = 0;
while (y < 100) {
  years.push({
    key: y,
    text: (1990 + y).toString(),
    value: (1990 + y).toString(),
  });
  y++;
}

const countries = [
  {
    iso: "TUN",
    text: "Tunisia",
    value: "00366029-9bc0-46d8-a548-26e159dbae12",
  },
  {
    iso: "NIG",
    text: "Nigeria",
    value: "8b1db25d-f650-4ce0-b83d-727729ae3bd9",
  },
  {
    iso: "CAM",
    text: "Cameroun",
    value: "773d327e-f323-4df2-b566-f0f749e607f2",
  },
];

const states = [
  { key: "bz", text: "Bizerte", value: "863e4057-f55a-4331-8121-5a82a497b86a" },
  { key: "ga", text: "Gabes", value: "9f7f1da7-d5c9-4439-b90e-3e7905ff94f4" },
  {
    key: "ka",
    text: "Kairouan",
    value: "6817f3d3-2871-4837-a2cf-a438a0a809e1",
  },
];

export { genderOptions, maritalStatus, days, months, years, countries, states };
