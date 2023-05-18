// Description:
// Verify that the h3 and h4 have text-align set to 'center'

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

test("Verify that the h3 and h4 have text-align set to 'center'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let h3 = body.querySelector("h3");
    let h4 = body.querySelector("h4");
    return (
      window.getComputedStyle(h3).textAlign === "center" &&
      window.getComputedStyle(h4).textAlign === "center"
    );
  }, body);

  expect(check).toBeTruthy();
});