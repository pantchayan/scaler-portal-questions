// Description:
// Verify that the drop-down menu for favourite food has Pizza as first default option.

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

test("drop-down has first option set as 'Pizza'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const formHandle = await page.$("form");

  const check = await page.evaluate((form) => {
    let dropDown = form.querySelector("select#food");

    if (dropDown.querySelector("option").innerText === "Pizza") {
      return true;
    } else {
      return false;
    }
  }, formHandle);

  expect(check).toBeTruthy();
});
