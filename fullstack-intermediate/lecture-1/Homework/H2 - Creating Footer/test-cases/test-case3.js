// Description:
// Verify that the webpage has <img> tag inscribed inside an <a> tag.

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

test("Verify that the webpage has <img> tag inscribed inside an <a> tag.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const imgEnclosed = await page.evaluate((a) => {
    let aTags = body.querySelectorAll("a");
    for (let i = 0; i < aTags.length; i++) {
      if (aTags[i].querySelector("img")) {
        return true;
      }
    }
    return false;
  }, body);

  expect(imgEnclosed).toBeTruthy();
});
