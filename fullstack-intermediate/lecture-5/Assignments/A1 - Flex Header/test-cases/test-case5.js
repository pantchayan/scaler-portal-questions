// Description:
// Verify that the flex-direction for h1.main-heading has value of 'column'.
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

test("Verify that the flex-direction for h1.main-heading has value of 'column'.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");
  const check = await page.evaluate((body) => {
    let div = body.querySelector("h1.main-heading");
    return window.getComputedStyle(div).flexDirection == "column";
  }, body);

  expect(check).toBeTruthy();
});
