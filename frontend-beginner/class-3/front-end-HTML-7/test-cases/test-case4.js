// Description:
// Verify that <input type='text' /> has a solid gray border of 10 pixels.

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

test("testing border of input[type='text']", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let inputHandle = body.querySelector("input[type='text']");

    return window.getComputedStyle(inputHandle).border === "10px solid rgb(128, 128, 128)";
  }, body);

  expect(check).toBeTruthy();
});