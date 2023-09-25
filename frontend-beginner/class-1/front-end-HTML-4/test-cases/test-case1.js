// Description:
// Verify that the webpage have 2 anchor tags.
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

test("Verify that the webpage have 2 anchor tags.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let anchorTags = body.querySelectorAll("a");
    return anchorTags.length === 2;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
