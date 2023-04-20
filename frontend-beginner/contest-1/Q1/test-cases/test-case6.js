// Description:
// Verify that the p element has a 5px solid black border on all sides.

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

test("Verify that the p element has a 5px solid black border on all sides.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = page.evaluate((body) => {
    let p = body.querySelector("p")
    return window.getComputedStyle(p).border == '4.44444px solid rgb(0, 0, 0)';
  }, bodyHandle);

  await expect(check).toBeTruthy();
});