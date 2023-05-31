// Description:
// Verify that there is a button of type 'submit'.
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

test("Verify that there is a button of type 'submit'.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");
  const check = await page.evaluate((body) => {
    let input1 = body.querySelector("button");
    return input1.getAttribute("type") == "submit";
  }, body);

  expect(check).toBeTruthy();
});
