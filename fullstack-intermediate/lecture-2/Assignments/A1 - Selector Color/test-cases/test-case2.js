// Description:
// Verify that the <p> tag with 'Select me' is 'blue'

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

test("Verify that the <p> tag with 'Select me' is 'blue'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let p = body.querySelector("#the-one > p.c1");

    return window.getComputedStyle(p).color === "rgb(0, 0, 255)";
  }, body);

  expect(check).toBeTruthy();
});
