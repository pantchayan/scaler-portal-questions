// Description:
// Verify that a.btn have display value as 'inline-block' and color value as 'white'

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

test("Verify that a.btn have display value as 'inline-block' and color value as 'white'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let btns = body.querySelectorAll("a.btn");
    return (
      window.getComputedStyle(btns[0]).display == "inline-block" &&
      window.getComputedStyle(btns[1]).display === "inline-block" &&
      window.getComputedStyle(btns[0]).color == "rgb(255, 255, 255)"
    );
  }, body);

  expect(check).toBeTruthy();
});
