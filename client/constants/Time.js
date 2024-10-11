export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const startYearN = 1990;
const endYearN = 2023;
export const years = Array.from(
  { length: endYearN - startYearN + 1 },
  (_, index) => (endYearN - index).toString()
);
