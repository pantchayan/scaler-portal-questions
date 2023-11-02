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

test("Verify that pressing b takes us to bottom", async () => {
  await page.goto("http://localhost:8080");

  await page.keyboard.press("b");
  await page.waitForTimeout(50); // Wait for the scroll animation to finish
  const isAtBottom = await page.evaluate(
    () =>
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
  );
  expect(isAtBottom).toBeTruthy();
});
