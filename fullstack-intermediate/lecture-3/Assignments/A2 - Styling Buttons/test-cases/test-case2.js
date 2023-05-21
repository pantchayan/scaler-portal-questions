// Description:
// Verify that a.btn have margin-right of 15px and background color of '#f63854'.
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

test("Verify that a.btn have margin-right of 15px and first button has background color of '#f63854'.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let btns = body.querySelectorAll("a.btn");
    return (
      window.getComputedStyle(btns[0]).marginRight == "15px" &&
      window.getComputedStyle(btns[1]).marginRight == "15px" &&
      window.getComputedStyle(btns[0]).backgroundColor == "rgb(246, 56, 84)"
    );
  }, body);

  expect(check).toBeTruthy();
});
