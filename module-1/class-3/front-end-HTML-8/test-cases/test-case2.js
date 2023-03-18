// Description:
// Verify that the background color of p element is 'rgb(255,255,0)'

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

test("background color of p element is 'rgb(255,255,0)'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let pHandle = body.querySelector("p");

    return window.getComputedStyle(pHandle).backgroundColor === "rgb(255, 255, 0)";
  }, body);

  expect(check).toBeTruthy();
});
