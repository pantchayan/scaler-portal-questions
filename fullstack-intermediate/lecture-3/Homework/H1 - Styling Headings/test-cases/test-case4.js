// Description:
// Verify that h2::after has color property set to #f63854

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

test("Verify that h2::after has color property set to #f63854", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let h2 = body.querySelector("h2");
    return window.getComputedStyle(h2, ":after").color == "rgb(246, 56, 84)";
  }, body);

  expect(check).toBeTruthy();
});
