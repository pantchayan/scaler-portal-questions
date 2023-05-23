// Description:
// Verify that the div.footer-parent, ul.footer-text & ul.social-link have display set as flex.
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

test("Verify that the div.footer-parent, ul.footer-text & ul.social-link have display set as flex.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = body.querySelector("div.footer-parent");
    let ulText = body.querySelector("ul.footer-text");
    let ulIcon = body.querySelector("ul.social-link");

    return (
      window.getComputedStyle(div).display === "flex" &&
      window.getComputedStyle(ulText).display === "flex" &&
      window.getComputedStyle(ulIcon).display === "flex"
    );
  }, body);

  expect(check).toBeTruthy();
});
