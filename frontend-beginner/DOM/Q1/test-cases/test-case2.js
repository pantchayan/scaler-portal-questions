// Description:
// Verify that the inner text of the <div> is 'Hello'
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

test("Verify that the inner text of the <div> is 'Hello'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  await page.click("button");
  const check = await page.evaluate((body) => {
    let ansDiv = body.querySelector("div").innerText;
    return ansDiv == 'Hello';
  }, bodyHandle);

  expect(check).toBeTruthy();
});
