// Description:
// Verify that when Backspace or Delete key is pressed, it removes the input from current field.
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

test("Verify that when Backspace or Delete key is pressed, it removes the input from current field.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  await page.waitForSelector(".input");
  await page.type(".input", "1");
  await page.focus("input");
  await page.keyboard.press("Delete");
  // await page.keyboard.press("Delete");
  const check = await page.evaluate((body) => {
    let allInput = body.querySelectorAll(".input");
    return allInput[0].value == "";
  }, bodyHandle);
  expect(check).toBeTruthy();
});