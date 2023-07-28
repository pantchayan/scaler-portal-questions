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

test("Single Click Turns Background Color to Red", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const p = await page.$("p");
  await p.click();

  const check = await page.evaluate((body) => {
    let p = body.querySelector("p");

    return window.getComputedStyle(p).backgroundColor == "rgb(255, 0, 0)";
  }, bodyHandle);

  expect(check).toBeTruthy();
});
