// Description:
// Verify that the li elements are positioned as 'flex-end' across horizontal axis.
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

test("Verify that the li elements are positioned as 'flex-end' across horizontal axis.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");
  const check = await page.evaluate((body) => {
    let ul = body.querySelector("ul");
    return window.getComputedStyle(ul).justifyContent == "flex-end";
  }, body);

  expect(check).toBeTruthy();
});
