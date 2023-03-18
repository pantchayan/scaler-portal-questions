// Description:
// Verify if the {PERSON'S_NAME} is #5DA9E9 in color.

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

test("Verify if the {PERSON'S_NAME} is #5DA9E9 in color.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");
  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let header = body.querySelector("header h1");

    return window.getComputedStyle(header).color === "rgb(93, 169, 233)";
  }, body);

  expect(check).toBeTruthy();
});
