// Description:
// Verify that the web page consists of one <section> and <h1> tag.

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

test("Verify that the web page consists of one <section> and <h2> tag.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const sectionHandles = await page.$("section");
  const h2Handles = await page.$("h2");
  expect(sectionHandles).toBeTruthy();
  expect(h2Handles).toBeTruthy();
});
