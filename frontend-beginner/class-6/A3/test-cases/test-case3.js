// Description:
// Verify if the following property available on .grid class gap: 10px;
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

test("Verify if the following property available on .grid class gap: 10px;", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let gap = window.getComputedStyle(document.querySelector(".grid")).gap;
    return gap === "10px";
  }, body);

  expect(check).toBeTruthy();
});
