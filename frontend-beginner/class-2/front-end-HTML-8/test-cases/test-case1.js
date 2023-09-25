// Description:
// Verify Table is created (table tag is used).
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

test("Verify Table is created (table tag is used).", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let tableTag = body.querySelectorAll("table");
    return tableTag.length !== 0;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
