// Description:
// Verify "and business" is wrapped in <del>
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

test('Verify "and business" is wrapped in <del>', async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let delTag = body.querySelector("del");
    return delTag.innerText.includes("and business");
  }, bodyHandle);

  expect(check).toBeTruthy();
});
