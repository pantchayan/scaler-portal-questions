// Description:
// Verify "upskilling platform" is wrapped in <i>
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

test("Verify 'upskilling platform' is wrapped in <i>", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let iTag = body.querySelector("i");
    return iTag.innerText.includes("upskilling platform");
  }, bodyHandle);

  expect(check).toBeTruthy();
});
