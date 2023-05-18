// Description:
// Verify that for div.container the margin from bottom is 30px and from right is 15px.

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

test("Verify that for div.container the margin from bottom is 30px and from right is 15px.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = body.querySelector(".container");
    return window.getComputedStyle(div).margin == "0px 15px 30px 0px";
  }, body);

  expect(check).toBeTruthy();
});