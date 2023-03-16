// Description:
// Verify that the webpage has a paragraph of text using the <p> tag that contains description text.

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

test("has <p> tag for description text", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const pHandles = await page.$("p");
  expect(pHandles).toBeTruthy();
});
