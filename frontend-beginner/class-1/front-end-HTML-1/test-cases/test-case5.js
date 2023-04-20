// Description:
// Verify that the webpage has description heading with <h3> tag.

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

test("has <h3> tag for description heading.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const h3Handles = await page.$("h3");
  expect(h3Handles).toBeTruthy();
});
