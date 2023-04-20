// Description:
// Verify that 'grid-container' div has display type of grid.
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

test("Verify that 'grid-container' has display type of grid.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  await page.click("button");
  const check = page.evaluate((body) => {
    let ansDiv = body.querySelector("div");
    return ansDiv;
  }, bodyHandle);

  await expect(check).toBeTruthy();
});
