// Description:
// Verify that the div element has a 10px dashed blue border on all sides.

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

test("Verify that the div element has a 10px dashed blue border on all sides.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = page.evaluate((body) => {
    let d = body.querySelector("div");
    return window.getComputedStyle(d).border == "10px dashed rgb(0, 0, 255)";
  }, bodyHandle);

  await expect(check).toBeTruthy();
});
