// Description:
// Verify that there are 4 labels in the HTML code.

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

test("Verify that there are 4 labels in the HTML code.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let labels = body.querySelectorAll("label");
    return labels.length == 4;
  }, body);

  expect(check).toBeTruthy();
});
