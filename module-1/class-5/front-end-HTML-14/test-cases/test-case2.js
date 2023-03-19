// Description:
// Verify that justify-content property is used to control the alignment along the main axis.
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

test("Verify that justify-content property is used to control the alignment along the main axis.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let box = body.querySelector(".container");

    return window.getComputedStyle(box).justifyContent === "center";
  }, body);

  expect(check).toBeTruthy();
});
