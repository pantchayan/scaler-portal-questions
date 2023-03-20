// Description:
// Verify if the width of the image in header section is 400px.

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

test("Verify if the width of the image in header section is 30%.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");
  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let headerImg = body.querySelector("header img");

    return window.getComputedStyle(headerImg).width === "400px";
  }, body);

  expect(check).toBeTruthy();
});
