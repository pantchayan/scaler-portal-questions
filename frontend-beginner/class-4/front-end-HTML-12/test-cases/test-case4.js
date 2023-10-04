// Description:
// Ensure that the box has a padding of 30px.

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

test("Ensure that the box has a padding of 30px.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let box = body.querySelector(".box");
    let padding = window.getComputedStyle(box).padding;
    return padding === "30px";
  }, body);

  expect(check).toBeTruthy();
});
