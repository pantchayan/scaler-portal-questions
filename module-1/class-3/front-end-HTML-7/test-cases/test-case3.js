// Description:
// Verify that font-size of <p id='special'> is set to 20 pixels.

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

test("font-size of <p id='special'> is set to 20 pixels", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let pHandle = body.querySelector("#special");

    return window.getComputedStyle(pHandle).fontSize === "20px";
  }, body);

  expect(check).toBeTruthy();
});
