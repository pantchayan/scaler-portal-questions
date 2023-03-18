// Description:
// Verify that <a> changes color to 'red' when hovered over.

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

test("testing if <a> color is 'red' on hover", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let aHandle = body.querySelector("a");

    return (
      window.getComputedStyle(aHandle, ":hover").color === "rgb(0, 0, 238)"
    );
  }, body);

  expect(check).toBeTruthy();
});
