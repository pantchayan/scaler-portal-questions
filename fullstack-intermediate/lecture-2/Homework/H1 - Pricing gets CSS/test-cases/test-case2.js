// Description:
// Verify that the div.card has a padding of 25px on top, 10px on left, 50px on bottom, and 10px on right.
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

test("Verify that the div.card has a padding of 25px on top, 10px on left, 50px on bottom, and 10px on right.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = body.querySelector(".card");
    return window.getComputedStyle(div).padding === "25px 10px 50px";
  }, body);

  expect(check).toBeTruthy();
});
