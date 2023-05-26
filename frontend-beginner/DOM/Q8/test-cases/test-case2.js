// Description:
// Clicking on any of these two buttons also removes it and adds two new 'double' buttons.
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

test("Clicking on any of these two buttons also removes it and adds two new 'double' buttons.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const doubleBtn = await page.$(".double");
  await doubleBtn.click();

  doubleBtn = await page.$(".double");
  doubleBtn.click();

  const check = await page.evaluate((body) => {
    let newBtns = body.querySelectorAll("button");
    return newBtns.length == 3;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
