// Description:
// Check if the box has a border of 10px.

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

test("Check if the box has a border of 10px.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");
  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let box = body.querySelector(".box");
    let borderArr = window.getComputedStyle(box).border.split(" ");
    return borderArr[0] === "10px";
  }, body);

  expect(check).toBeTruthy();
});
