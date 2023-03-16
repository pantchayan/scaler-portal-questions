// Description:
// Verify that the webpage has a heading and intro using the <h1> and <h3> tags respectively.

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

test("has <h1> and <h2> tags for heading and intro", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const h1Handles = await page.$("h1");
  const h3Handles = await page.$("h3");
  expect(h1Handles).toBeTruthy();
  expect(h3Handles).toBeTruthy();
});