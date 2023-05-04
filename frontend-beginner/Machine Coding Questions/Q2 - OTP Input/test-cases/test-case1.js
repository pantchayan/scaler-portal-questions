// Description:
// Verify that the input fields only take a number as valid input.
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

test("Verify that the input fields only take a number as valid input.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");
  const bodyHandle = await page.$("body");

  await page.waitForSelector(".input");
  await page.type(".input", "abc");

  const check = await page.evaluate((body) => {
    let input = body.querySelector(".input");
    return { flag: input.value == "", val: input.value };
  }, bodyHandle);
  console.log(check.val);
  expect(check.flag).toBeTruthy();
});
