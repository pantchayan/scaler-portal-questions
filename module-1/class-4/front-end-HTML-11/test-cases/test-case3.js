// Description:
// Verify if the box has a margin of 20px.

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

test("Verify if the box has a margin of 20px.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let box = body.querySelector(".box");
    let margin = window.getComputedStyle(box).margin;
    return margin === "20px";
  }, body);

  expect(check).toBeTruthy();
});
