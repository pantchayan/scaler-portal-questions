// Description:
// Verify that the main content section is vertically centered.

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

test("Verify that the main content section is vertically centered.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = page.evaluate((body) => {
    let m = body.querySelector("main");
    return window.getComputedStyle(m).alignItems == "center";
  }, bodyHandle);

  await expect(check).toBeTruthy();
});