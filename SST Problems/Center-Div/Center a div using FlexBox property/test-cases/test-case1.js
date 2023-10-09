// Description:
// Verify if the following property available on .grid class grid-template-columns: repeat(3, 1fr) or 3fr 3fr 3fr;
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

test("Verify that the div is centered using the mentioned properties.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = window.getComputedStyle(body.querySelector(".parent"));

    return (
      div.display === "flex" &&
      div.justifyContent === "center" &&
      div.alignItems === "center"
    );
  }, body);

  expect(check).toBeTruthy();
});