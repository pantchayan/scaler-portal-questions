// Description:
// Verify that the webpage has a <button> tag.

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

test("has a <button> tag", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const button = await page.$("button");
  expect(button).toBeTruthy();
});