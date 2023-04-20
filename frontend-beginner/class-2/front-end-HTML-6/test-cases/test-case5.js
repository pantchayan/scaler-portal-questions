// Description:
// Verify that the webpage has 3 <label> tags.

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

test("has 3 <label> tags", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const formHandle = await page.$("form");

  const check = await page.evaluate((form) => {
    let labelTags = form.querySelectorAll("input");

    if (labelTags.length === 3) {
      return true;
    } else {
      return false;
    }
  }, formHandle);

  expect(check).toBeTruthy();
});
