// Description:
// Verify that the h1.main-heading has display set as flex.

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

test("Verify that the h1.main-heading has display set as flex.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let h1 = body.querySelector("h1.main-heading");
    return window.getComputedStyle(h1).display === "flex";
  }, body);

  expect(check).toBeTruthy();
});
