// Description:
// Verify if the data for the 5 books is present.

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

test("Verify if the data for the 5 books is present", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const tbodyHandle = await page.$("tbody");

  const bookCountCheck = await page.evaluate((a) => {
    return a.childElementCount >= 5;
  }, tbodyHandle);

  expect(bookCountCheck).toBeTruthy();
});
