// Description:
// Verify that the background has a linear gradient of: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1))

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

test("Verify that the background has a linear gradient of: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1))", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let header = body.querySelector("header");
    return window
      .getComputedStyle(header)
      .background.includes("linear-gradient(rgba(0, 0, 0, 0.5), rgb(0, 0, 0))");
  }, body);

  expect(check).toBeTruthy();
});
