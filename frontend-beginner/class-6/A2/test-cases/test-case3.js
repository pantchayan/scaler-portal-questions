// Description:
// Verify that content inside pin_container is centered using justify-content.
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

test("Verify that content inside pin_container is centered using justify-content.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let container = body.querySelector(".pin_container");

    return window.getComputedStyle(container).justifyContent === "center";
  }, body);

  expect(check).toBeTruthy();
});
