// Description:
// Clicking on 'double button' destroys it (removes it from parent div).
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

test("Clicking on 'double button' destroys it (removes it from parent div).", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const doubleBtn = await page.$(".double");
  await doubleBtn.click();

  const check = await page.evaluate((body) => {
    let doubleBtn = body.querySelector(".double");
    return doubleBtn == null;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
