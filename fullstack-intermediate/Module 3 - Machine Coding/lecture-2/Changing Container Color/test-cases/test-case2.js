// Description:
// Verify that the data-color attribute is set to 'used' after double clicking
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

test("Clicking on blue, changes background to blue", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const div = await page.$("div.blue");
  await div.click();

  const check = await page.evaluate((body) => {
    let div = body.querySelector("div.container");

    return window.getComputedStyle(div).backgroundColor == "rgb(0, 0, 255)";
  }, bodyHandle);

  expect(check).toBeTruthy();
});
