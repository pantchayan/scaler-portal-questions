// Description:
// Verify that the missing <li> element has been added
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

test("Verify that the missing <li> element has been added", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let allListItems = body.querySelectorAll("li");

    let sevenElem = allListItems[6];

    return sevenElem.innerText == "7";
  }, bodyHandle);

  expect(check).toBeTruthy();
});
