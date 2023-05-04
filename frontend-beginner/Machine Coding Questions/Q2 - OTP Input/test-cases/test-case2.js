// Description:
// Verify that the focus movies to the next input field whenever a single digit is entered.
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

test("Verify that the focus movies to the next input field whenever a single digit is entered.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  await page.waitForSelector(".input");
  await page.type(".input", "1");

  const check = await page.evaluate((body) => {
    let allInput = body.querySelectorAll(".input");
    return allInput[1] == document.activeElement;
  }, bodyHandle);
  expect(check).toBeTruthy();
});
