// Description:
// 2. Verify that the web page consists of three <h3>, <h4>, <p> tags.
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

test("2. Verify that the web page consists of three <h3>, <h4>, <p> tags.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let h3 = body.querySelectorAll("h3");
    let h4 = body.querySelectorAll("h4");
    let p = body.querySelectorAll("p");
    return h3.length >= 3 && h4.length >= 3 && p.length >= 3;
  }, body);

  expect(check).toBeTruthy();
});
