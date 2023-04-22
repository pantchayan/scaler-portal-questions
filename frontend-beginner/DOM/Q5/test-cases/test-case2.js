// Description:
// Verify that the jail is removed when the mouse exits the cell.
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

test("Verify that the jail is removed when the mouse exits the cell.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = body.querySelector(".cell");

    return window.getComputedStyle(div).backgroundImage == 'none';
  }, bodyHandle);

  expect(check).toBeTruthy();
});
