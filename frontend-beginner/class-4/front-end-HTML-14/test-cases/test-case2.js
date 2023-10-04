// Description:
// Verify that ul.nav has background color of 'yellow'

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

test("Verify that ul.nav has background color of 'yellow'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");
  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let nav = body.querySelector(".nav");
    return window.getComputedStyle(nav).backgroundColor === "rgb(255, 255, 0)";
  }, body);

  expect(check).toBeTruthy();
});
