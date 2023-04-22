// Description:
// Verify that a new <div> is added to <body> when button is clicked.
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

test("Verify that a new <div> is added to <body> when button is clicked.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  await page.click("button");
  const check = await page.evaluate((body) => {
    let ansDiv = body.querySelector("div");
    return ansDiv;
  }, bodyHandle);

  expect(check).toBeTruthy();
});



