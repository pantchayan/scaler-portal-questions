// Description:
// Verify that the webpage has a heading and description using the <h2> and <p> tags respectively.

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

test("has a heading and description using the <h2> and <p> tags respectively", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const h2Handles = await page.$("h2");
  const pHandles = await page.$("p");

  expect(h2Handles).toBeTruthy();
  expect(pHandles).toBeTruthy();
});
