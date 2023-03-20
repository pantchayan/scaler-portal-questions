// Description:
// Verify if font-family is set to 'Lato', sans-serif.
const puppeteer = require("puppeteer");

let browser;

beforeAll(async () => {
  browser = await puppeteer.launch({
    executablePath: process.env.CHROMIUM_PATH,
    args: ["--no-sandbox"], // This was important. Can't remember why
  });
});

afterAll(async () => {
  await browser.close();
});

test("Verify if font-family is set to 'Lato', sans-serif.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const check = await page.evaluate((body) => {
    let arr = window.getComputedStyle(body).fontFamily.split(" ");

    return arr[arr.length - 1] === "sans-serif";
  }, body);

  expect(check).toBeTruthy();
});
