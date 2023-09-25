// Description:
// Verify that the webpage has ordered list defined with <ol> tag.
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

test("Verify that the webpage has ordered list defined with <ol> tag.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  const check = await page.evaluate((body) => {
    let olTags = body.querySelectorAll("ol");
    return olTags.length !== 0;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
