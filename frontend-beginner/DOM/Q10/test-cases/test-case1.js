// Description:
// Verify that the individual delete buttons are working.
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

test("Verify that the individual delete buttons are working.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const individualBtn = await page.$("li button");
  await individualBtn.click();

  const check = await page.evaluate((body) => {
    let listItem = body.querySelector("li");
    return window.getComputedStyle(listItem).display == "none";
  }, bodyHandle);

  expect(check).toBeTruthy();
});
