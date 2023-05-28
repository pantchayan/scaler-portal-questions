// Description:
// Verify that the nav has a top property of value 0.
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

test("Verify that the nav has a top property of value 0.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");
  const check = await page.evaluate((body) => {
    let nav = body.querySelector("nav");
    return window.getComputedStyle(nav).top === "0";
  }, body);

  expect(check).toBeTruthy();
});
