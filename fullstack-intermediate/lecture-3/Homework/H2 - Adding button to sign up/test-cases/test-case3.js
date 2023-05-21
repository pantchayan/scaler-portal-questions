// Description:
// Verify that div.signup-button has top value set as '45px'

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

test('Verify that div.signup-button has top value set as "45px"', async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let btn = body.querySelector("div.signup-button");
    return window.getComputedStyle(btn).top === "45px";
  }, body);

  expect(check).toBeTruthy();
});
