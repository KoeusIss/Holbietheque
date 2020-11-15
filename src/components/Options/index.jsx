/**
 * Gender options for
 * @type {({text: string, value: string, key: string})[]}
 */
const genderOptions = [
  {key: "m", text: "Male", value: "male"},
  {key: "f", text: "Female", value: "female"},
  {key: "o", text: "Other", value: "other"},
];

const maritalStatus = [
  {key: "m", text: "Married", value: "married"},
  {key: "s", text: "Single", value: "single"},
  {key: "o", text: "Other", value: "other"},
];

const communLangs = [
  {key: "us", text: "English", value: "english"},
  {key: "fr", text: "French", value: "french"},
  {key: "tn", text: "Arabic", value: "arabic"},
  {key: "es", text: "Spanish", value: "spanish"},
];

/**
 * Skills and language level
 * @type {({text: string, value: string, key: string})[]}
 */
const levels = [
  {key: "1", text: "Basic", value: "basic"},
  {key: "2", text: "Novice", value: "novice"},
  {key: "3", text: "Intermediate", value: "intermediate"},
  {key: "4", text: "Advanced", value: "advanced"},
  {key: "5", text: "Expert", value: "expert"},
];

/**
 * Job level
 * @type {({text: string, value: string, key: string})[]}
 */
const jobLevels = [
  {key: "1", text: "Associate", value: "Associate"},
  {key: "2", text: "Senior", value: "Senior"},
  {key: "3", text: "Junior", value: "Junior"},
  {key: "4", text: "Entry level", value: "Entry level"},
  {key: "5", text: "Manager", value: "Manager"},
  {key: "6", text: "Executive", value: "Executive"},
];

/**
 * Job types
 * @type {({text: string, value: string, key: string})[]}
 */
const jobTypes = [
  {key: "1", text: "Internship", value: "Internship"},
  {key: "2", text: "Full time", value: "Full time"},
  {key: "3", text: "Part time", value: "Part time"},
  {key: "4", text: "Contract", value: "Contract"},
  {key: "5", text: "Volunteer", value: "Volunteer"},
  {key: "6", text: "Apprenticeship", value: "Apprenticeship"},
];

const technologies = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]

const days = [];
let d = 1;
while (d < 32) {
  days.push({key: d, text: d.toString(), value: d.toString()});
  d++;
}

const months = [
  {key: "1", text: "January", value: "01"},
  {key: "2", text: "February", value: "02"},
  {key: "3", text: "March", value: "03"},
  {key: "4", text: "April", value: "04"},
  {key: "5", text: "May", value: "05"},
  {key: "6", text: "June", value: "06"},
  {key: "7", text: "July", value: "07"},
  {key: "8", text: "August", value: "08"},
  {key: "9", text: "September", value: "09"},
  {key: "10", text: "October", value: "10"},
  {key: "11", text: "November", value: "11"},
  {key: "12", text: "December", value: "12"},
];

const years = [];
let y = 0;
while (y < 200) {
  years.push({
    key: y,
    text: (1900 + y).toString(),
    value: (1900 + y).toString(),
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
  {key: "bz", text: "Bizerte", value: "0129e227-a82e-4836-b152-5ea8adba6669"},
  {key: "ga", text: "Gabes", value: "9f7f1da7-d5c9-4439-b90e-3e7905ff94f4"},
  {
    key: "ka",
    text: "Kairouan",
    value: "6817f3d3-2871-4837-a2cf-a438a0a809e1",
  },
];

const company_size = [
  {key: "t", text: "0-20", value: "0-20"},
  {key: "m", text: "20-50", value: "20-50"},
  {key: "s", text: "50-100", value: "50-100"},
  {key: "b", text: "100-500", value: "100-500"},
  {key: "h", text: "> 500", value: "> 500"},
]

export {
  genderOptions,
  maritalStatus,
  days,
  months,
  years,
  countries,
  states,
  communLangs,
  levels,
  company_size,
  jobLevels,
  jobTypes,
  technologies
};
