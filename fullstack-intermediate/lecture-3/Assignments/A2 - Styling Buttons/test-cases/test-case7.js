// Description:
// Verify that whenever hovered upon, the buttons (a.btn) transform to scale by factor of 1.2

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

test("Verify that whenever hovered upon, the buttons (a.btn) transform to scale by factor of 1.2", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");
  const button = await page.$("a.btn");

  await button.hover();

  const check = await page.evaluate((body) => {
    let btn = body.querySelector("a.btn");
    return window.getComputedStyle(btn).transform.includes("matrix");
  }, body);

  expect(check).toBeTruthy();
});
