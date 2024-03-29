// Description:
// Verify if the following property available on .grid class grid-template-rows: repeat(3, 1fr) or 1fr 1fr 1fr;
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

test("Verify if the following property available on .grid class grid-template-rows: repeat(3, 1fr) or 1fr 1fr 1fr;", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let row = window.getComputedStyle(
      body.querySelector(".grid")
    ).gridTemplateRows;
    let rowArr = row.split(" ");
    return rowArr.length === 3;
  }, body);

  expect(check).toBeTruthy();
});
