// Description:
// Verify that for div.container-parent the display is set to flex.

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

test("Verify that for div.container-parent the display is set to flex.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  
  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = body.querySelector(".container-parent");
    return window.getComputedStyle(div).display === 'flex';
  }, body);

  expect(check).toBeTruthy();
});
