// Description:
// Verify that the color of h1 element is 'blue'
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
  expect(h1ComputedStyle1).toBe("rgb(0, 0, 255)");
});
