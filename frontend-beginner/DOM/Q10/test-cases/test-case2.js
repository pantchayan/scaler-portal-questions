// Description:
// Verify that the Remove All button is working.
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

test("Verify that the Remove All button is working.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const doubleBtn = await page.$(".double");
  await doubleBtn.click();

  const check = await page.evaluate((body) => {
    let newBtns = body.querySelectorAll("button");
    return newBtns.length == 2;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
