// Description:
// 4. Verify that the webpage contains a <p> tag.

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

test("4. Verify that the webpage contains a <p> tag.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const pHandles = await page.$("p");
  expect(pHandles).toBeTruthy();
});
