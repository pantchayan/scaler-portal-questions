// Description:
// Verify that header, nav, content, and footer are defined using CSS Grid properties.
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

test("Verify that header, nav, content, and footer are defined using CSS Grid properties.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  await page.click("button");
  const check = page.evaluate((body) => {
    let ansDiv = body.querySelector("div").innerText;
    return ansDiv == 'Hello';
  }, bodyHandle);

  await expect(check).toBeTruthy();
});
