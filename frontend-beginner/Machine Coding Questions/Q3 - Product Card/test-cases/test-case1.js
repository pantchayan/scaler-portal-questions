// Description:
// Verify that a total of 20 product cards (div.card) are present in the Document.
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

test("Verify that a total of 20 product cards (div.card) are present in the Document.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");
  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let allCards = body.querySelectorAll(".card");
    return allCards.length == 20;
  }, bodyHandle);
  expect(check).toBeTruthy();
});