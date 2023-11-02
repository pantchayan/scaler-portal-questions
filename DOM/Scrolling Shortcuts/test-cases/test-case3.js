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

test("Verify that pressing 3 takes us to section 3", async () => {
  await page.goto("http://localhost:8080");

  await page.keyboard.press("3");
  await page.waitForSelector("#s3"); // Wait for the element you're scrolling to
  const section1 = await page.$("#s3");
  const isVisible = await section1.isIntersectingViewport();
  expect(isVisible).toBeTruthy();
});
