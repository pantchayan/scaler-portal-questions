// Description:
// Verify that the webpage has an <img> tag alt attribute on the image with values mentioned on the question.

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

test("Verify that the webpage has an <img> tag with alt attribute on the image with value mentioned on the question.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let imgTag = body.querySelector("img");
    return imgTag.alt == "scaler academy logo";
  }, bodyHandle);

  expect(check).toBeTruthy();
});
