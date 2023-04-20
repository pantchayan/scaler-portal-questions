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

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let grid = body.querySelector(".grid-container");

    return window.getComputedStyle(grid).display === "grid";
  }, body);

  expect(check).toBeTruthy();
});
