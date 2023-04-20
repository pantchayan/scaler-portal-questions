// Description:
// Verify that the footer section has a height of 50px.

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

test("Verify that the footer section has a height of 50px.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = page.evaluate((body) => {
    let f = body.querySelector("footer")
    return window.getComputedStyle(f).height == '50px';
  }, bodyHandle);

  await expect(check).toBeTruthy();
});
