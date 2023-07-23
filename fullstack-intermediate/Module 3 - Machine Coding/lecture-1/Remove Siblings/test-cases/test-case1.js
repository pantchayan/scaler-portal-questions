// Description:
// Verify that the missing <li> element has been added
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

test("Checking that there is only one div.card available", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let allDivs = body.querySelectorAll("div.card");
    return allDivs.length == 1;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
