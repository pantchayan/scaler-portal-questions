// Description:
// Verify that div.signup-button has text-align value set as 'center'

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

test("Verify that div.signup-button has text-align value set as 'center'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let btn = body.querySelector("div.signup-button");
    return window.getComputedStyle(btn).textAlign === "center";
  }, body);

  expect(check).toBeTruthy();
});
