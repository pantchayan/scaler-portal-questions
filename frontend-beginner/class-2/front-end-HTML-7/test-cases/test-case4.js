// Description:
// Verify that the webpage has unordered list defined with <ul> tag.
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

test("Verify that the webpage has unordered list defined with <ul> tag.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let ulTags = body.querySelectorAll("ul");
    return ulTags.length !== 0;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
