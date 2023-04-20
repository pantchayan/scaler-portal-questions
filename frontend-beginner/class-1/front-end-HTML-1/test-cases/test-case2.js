// Description:
// Verify that the webpage has atleast one <a> tag making up the nav-bar.
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

test("Contains atleast one <a> tag making up the nav-bar.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const heading = await page.$("a");
  expect(heading).toBeTruthy();
});
