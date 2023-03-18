// Description:
// Verify that the webpage has <a> tags with enclosed <img> tags for social profile links.

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

test("has <a> tags with enclosed <img> tags for social profile links", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const aHandles = await page.$("a");
  const imgEnclosed = await page.evaluate(
    (a) => a.querySelector("img"),
    aHandles
  );

  expect(imgEnclosed).toBeTruthy();
});
