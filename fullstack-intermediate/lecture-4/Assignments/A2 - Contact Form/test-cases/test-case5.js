// Description:
// Verify that the div.container_parent has elements across horizontal axis are spaced evenly.

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

test("Verify that the div.container_parent has elements across horizontal axis are spaced evenly.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = body.querySelector('div.container_parent')

    return window.getComputedStyle(div).justifyContent === 'space-evenly';
  }, body);

  expect(check).toBeTruthy();
});
