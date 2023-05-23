// Description:
// Verify that the div.footer-parent has elements across horizontal axis positioned as 'space-between'
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

test("Verify that the div.footer-parent has elements across horizontal axis positioned as 'space-between'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = body.querySelector("div.footer-parent");

    return window.getComputedStyle(div).justifyContent === "space-between";
  }, body);

  expect(check).toBeTruthy();
});
