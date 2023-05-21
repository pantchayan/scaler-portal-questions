// Description:
// Verify that a.btn-empty has color set to #f63854 and background-color set to 'transparent'

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

test("Verify that a.btn-empty has color set to #f63854 and background-color set to 'transparent'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let btn = body.querySelector("a.btn-empty");
    return (
      window.getComputedStyle(btn).color === "rgb(246, 56, 84)" &&
      window.getComputedStyle(btn).backgroundColor == "rgba(0, 0, 0, 0)"
    );
  }, body);

  expect(check).toBeTruthy();
});
