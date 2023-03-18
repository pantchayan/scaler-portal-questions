// Description:
// Verify that the webpage has a <h1> tag that contains the heading 'Get in Touch'.

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

test("has <h1> tag with 'get in touch' as innerText", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const h1Handles = await page.$("h1");

  const check = await page.evaluate((h1) => {
    let x = h1.innerText;
    if (x.toLowerCase() === "get in touch") {
      return true;
    } else {
      return false;
    }
  }, h1Handles);

  expect(check).toBeTruthy();
});