// Description:
// Verify that div.card has a border of width 1px, style solid and color as lightgrey.

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

test("Verify that div.card has a border of width 1px, style solid and color as lightgrey.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let card = body.querySelector("div.card");
    return window.getComputedStyle(card).border.includes("solid");
  }, body);

  expect(check).toBeTruthy();
});
