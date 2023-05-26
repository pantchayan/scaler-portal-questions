// Description:
// Clicking on 'double button' removes it and adds two new 'double' buttons inside the parent div.
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

test("Clicking on 'double button' removes it and adds two new 'double' buttons inside the parent div.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const doubleBtn = await page.$(".double");
  await doubleBtn.click();

  const check = await page.evaluate((body) => {
    let newBtns = body.querySelectorAll("button");
    return newBtns.length == 2;
  }, bodyHandle);

  expect(check).toBeTruthy();
});