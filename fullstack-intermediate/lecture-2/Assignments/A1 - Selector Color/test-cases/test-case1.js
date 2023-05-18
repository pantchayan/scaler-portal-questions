// Description:
// Verify that the style is not applied using inline css

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

test("Verify that the style is not applied using inline css", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let p = body.querySelector("#the-one > p.c1");
    let div = body.querySelector("#the-one > div.c1");
    return !p.outerHTML.includes("style") && !div.outerHTML.includes("style");
  }, body);

  expect(check).toBeTruthy();
});
