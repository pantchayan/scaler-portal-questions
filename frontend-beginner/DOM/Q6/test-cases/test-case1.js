// Description:
// Verify that the 'none' filter is working.
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

test("Verify that the 'none' filter is working.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  await page.select('select', 'none')

  const check = await page.evaluate((body) => {
    let moviesDivs = body.querySelectorAll('.movies');

    return moviesDivs.length == 10;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
