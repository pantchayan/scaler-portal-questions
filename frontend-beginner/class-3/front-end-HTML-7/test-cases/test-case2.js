// Description:
// Verify that background color of <p class='highlight'> is 'yellow'.

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

test("p.highlight has background color of 'yellow'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let pHighlightHandle = body.querySelector(".highlight");

    return window.getComputedStyle(pHighlightHandle).backgroundColor === "rgb(255, 255, 0)";
  }, body);

  expect(check).toBeTruthy();
});
