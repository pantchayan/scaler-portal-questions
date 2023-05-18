// Description:
// Verify that the div.container has a padding of 20px from every side.

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

test("Verify that the div.container has a padding of 20px from every side.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  
  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = body.querySelector(".container");
    return window.getComputedStyle(div).padding == "20px";
  }, body);

  expect(check).toBeTruthy();
});