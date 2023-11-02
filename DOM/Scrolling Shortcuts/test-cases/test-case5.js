const puppeteer = require("puppeteer");

let browser;
let page;
beforeAll(async () => {
  browser = await puppeteer.launch({
    executablePath: process.env.CHROMIUM_PATH,
    args: ["--no-sandbox"], // This was important. Can't remember why
  });
  page = await browser.newPage();
  await page.setViewport({ width: 1100, height: 800 });
});

afterAll(async () => {
  await browser.close();
});

test("Verify that pressing t takes us to top", async () => {
  await page.goto("http://localhost:8080");

  await page.keyboard.press("t");
  await page.waitForTimeout(50); // Wait for the scroll animation to finish
  const isAtTop = await page.evaluate(() => window.scrollY === 0);
  expect(isAtTop).toBeTruthy();
});
