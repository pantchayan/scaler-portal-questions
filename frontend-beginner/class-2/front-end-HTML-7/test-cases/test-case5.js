// Description:
// Verify that the <ul> tag has type attribute set to "square"
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

test('Verify that the <ul> tag has type attribute set to "square"', async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let ulTag = body.querySelector("ul");
    return ulTag.type == "square";
  }, bodyHandle);

  expect(check).toBeTruthy();
});
