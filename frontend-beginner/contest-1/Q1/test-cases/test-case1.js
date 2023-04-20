// Description:
// Verify that the p element has a font size of 24px.

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

test("Verify that the p element has a font size of 24px.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = page.evaluate((body) => {
    let p = body.querySelector("p");
    return window.getComputedStyle(p).fontSize == "24px";
  }, bodyHandle);

  await expect(check).toBeTruthy();
});
