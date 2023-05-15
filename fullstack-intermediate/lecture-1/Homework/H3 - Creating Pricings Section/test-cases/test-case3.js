// Description:
// Verify that the web page consists of three <ul> tags.
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

test("Verify that the web page consists of three <ul> tags.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let ul = body.querySelectorAll("ul");
    return ul.length >= 3;
  }, body);

  expect(check).toBeTruthy();
});
