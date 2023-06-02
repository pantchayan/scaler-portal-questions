// Description:
// Verify that the ul.social-link has elements across horizontal axis positioned as 'end'.
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

test("Verify that the ul.social-link has elements across horizontal axis positioned as 'end'.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let ulIcon = body.querySelector("ul.social-link");

    return (
      window.getComputedStyle(ulIcon).justifyContent === "end" ||
      window.getComputedStyle(ulIcon).justifyContent === "flex-end"
    );
  }, body);

  expect(check).toBeTruthy();
});
