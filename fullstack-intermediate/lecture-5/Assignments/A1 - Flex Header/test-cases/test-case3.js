// Description:
// Verify that the items inside div.showcase are aligned to center across y-axis.
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

test("Verify that the items inside div.showcase are aligned to center across y-axis.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");
  const check = await page.evaluate((body) => {
    let div = body.querySelector("div.showcase");
    return window.getComputedStyle(div).justifyContent == "center";
  }, body);

  expect(check).toBeTruthy();
});
