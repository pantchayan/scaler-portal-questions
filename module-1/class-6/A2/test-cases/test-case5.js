// Description:
// Verify that grid-row-end property of card_medium is set to 'span 33'
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

test("Verify that grid-row-end property of card_medium is set to 'span 33'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let container = body.querySelector(".card_medium");

    return window.getComputedStyle(container).gridRowEnd === "span 33";
  }, body);

  expect(check).toBeTruthy();
});
