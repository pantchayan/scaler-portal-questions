// Description:
// Verify that the webpage has a name and intro using the <h1> and <h2> tags respectively.

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

test("has <h1> and <h2> tags for name and intro", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const h1Handles = await page.$("h1");
  const h2Handles = await page.$("h2");
  expect(h1Handles).toBeTruthy();
  expect(h2Handles).toBeTruthy();
});
