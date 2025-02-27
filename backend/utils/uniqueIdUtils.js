export const generateReportId = () => {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2); // Last 2 digits of the year
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () =>
    letters[Math.floor(Math.random() * letters.length)];

  const yearLetter = randomLetter();
  const monthLetter = randomLetter();
  const dayLetter = randomLetter();

  return `${year}${yearLetter}${month}${monthLetter}${day}${dayLetter}${hour}${minute}${second}`;
};
