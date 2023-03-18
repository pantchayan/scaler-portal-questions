// Description:
// Verify that the Color of element with 'highlight' class is '#ff0000'

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


test("color of .highlight element is 'rgb(255,0,0)'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let pHandle = body.querySelector(".highlight");

    return window.getComputedStyle(pHandle).color === "rgb(255, 0, 0)";
  }, body);

  expect(check).toBeTruthy();
});
