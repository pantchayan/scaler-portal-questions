// Description:
// Verify that the color of the card changes when double clicked (class of desired color is added)
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

test("Clicking on red, changes background to red", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const div = await page.$("div.red");
  await div.click();

  const check = await page.evaluate((body) => {
    let div = body.querySelector("div.container");

    return window.getComputedStyle(div).backgroundColor == "rgb(255, 0, 0)";
  }, bodyHandle);

  expect(check).toBeTruthy();
});
