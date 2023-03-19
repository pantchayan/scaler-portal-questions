// Description:
// Check if the background color of the box is lightgray.

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

test("Check if the background color of the box is lightgray.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let box = body.querySelector(".box");
    let backgroundColor = window.getComputedStyle(box).backgroundColor;
    return backgroundColor === "rgb(211, 211, 211)";
  }, body);

  expect(check).toBeTruthy();
});
