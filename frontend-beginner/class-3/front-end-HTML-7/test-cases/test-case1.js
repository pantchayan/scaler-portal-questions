// Description:
// Verify that <h1> is changed to 'blue' and is horizontally centered using text-align.

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

test("h1 tag has blue color", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const heading = await page.$("h1");
  const h1ComputedStyle1 = await page.evaluate(
    (el) => window.getComputedStyle(el).color,
    heading
  );
  const h1ComputedStyle2 = await page.evaluate(
    (el) => window.getComputedStyle(el).textAlign,
    heading
  );
  expect(h1ComputedStyle1).toBe("rgb(0, 0, 255)");
  expect(h1ComputedStyle2).toBe("center");
});
