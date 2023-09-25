// Description:
// Verify 'width' and 'height' attribute on image to be set to '100px'.
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

test("Verify 'width' and 'height' attribute on image to be set to '100px'.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let imgTag = body.querySelector("img");
    return imgTag.height === 100 && imgTag.width === 100;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
