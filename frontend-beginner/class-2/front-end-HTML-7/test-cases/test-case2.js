// Description:
// Verify that the <ol> tag has type attribute set to "a" or "A"
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

test('Verify that the <ol> tag has type attribute set to "a" or "A"', async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let olTag = body.querySelector("ol");
    return olTag.type == "a" || olTag.type == "A";
  }, bodyHandle);

  expect(check).toBeTruthy();
});
