// Description:
// Verify that the webpage contains <footer> tag.

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

test("Verify that the webpage contains <footer> tag.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const footerHandles = await page.$("footer");
  expect(footerHandles).toBeTruthy();
});
