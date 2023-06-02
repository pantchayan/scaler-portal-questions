// Description:
// Verify that the ul.footer-text has elements across horizontal axis positioned as 'start'.
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

test("Verify that the ul.footer-text has elements across horizontal axis positioned as 'start'.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let ulText = body.querySelector("ul.footer-text");

    return (
      window.getComputedStyle(ulText).justifyContent === "start" ||
      window.getComputedStyle(ulText).justifyContent === "flex-start"
    );
  }, body);

  expect(check).toBeTruthy();
});
