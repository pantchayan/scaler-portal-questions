// Description:
// Verify that the webpage has a <h2> tag that contains the heading 'CONTACT US'.

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

test("Verify that the webpage has a <h2> tag that contains the heading 'CONTACT US'.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const h2Handles = await page.$("h2");

  const check = await page.evaluate((h2) => {
    let x = h2.innerText;
    if (x.toLowerCase() === "contact us") {
      return true;
    } else {
      return false;
    }
  }, h2Handles);

  expect(check).toBeTruthy();
});