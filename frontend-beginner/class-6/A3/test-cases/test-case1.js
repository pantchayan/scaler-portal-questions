// Description:
// Verify if the following property available on .grid class grid-template-columns: repeat(3, 1fr) or 3fr 3fr 3fr;
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

test("Verify if the following property available on .grid class grid-template-columns: repeat(3, 1fr) or 3fr 3fr 3fr;", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let col = window.getComputedStyle(
      body.querySelector(".grid")
    ).gridTemplateColumns;
    let colArr = col.split(" ");
    return colArr.length === 3;
  }, body);

  expect(check).toBeTruthy();
});
