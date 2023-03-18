// Description:
// Verify that the Background color of input element is 'rgba(255, 0, 0, 0.5)'

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

test("Background color of input element is 'rgba(255, 0, 0, 0.5)'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");
  
  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let inputHandle = body.querySelector("input");

    return window.getComputedStyle(inputHandle).backgroundColor === "rgba(255, 0, 0, 0.5)";
  }, body);

  expect(check).toBeTruthy();
});
