// Description:
// Verify that position property of pin_container is set to 'absolute'
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

test("Verify that position property of pin_container is set to 'absolute'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let container = body.querySelector(".pin-container");

    return window.getComputedStyle(container).position === "absolute";
  }, body);

  expect(check).toBeTruthy();
});
