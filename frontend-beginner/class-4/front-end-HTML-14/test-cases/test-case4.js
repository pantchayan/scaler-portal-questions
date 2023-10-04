// Description:
// Verify that all li.nav have display of inline block.
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

test("Verify that all li.nav have display of inline block.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let liTag = body.querySelector("li");

    return (
      window.getComputedStyle(liTag).display === 'inline-block'
    );
  }, body);

  expect(check).toBeTruthy();
});
