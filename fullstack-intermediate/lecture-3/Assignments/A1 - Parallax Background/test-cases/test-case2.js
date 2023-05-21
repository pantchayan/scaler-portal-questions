// Description:
// Verify that the background has color of 'lightblue'
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

test("Verify that the background has color of 'lightblue'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const check = await page.evaluate((body) => {
    let header = body.querySelector("header");
    return window
      .getComputedStyle(header)
      .background.includes("rgb(173, 216, 230)");
  }, body);

  expect(check).toBeTruthy();
});
