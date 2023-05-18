// Description:
// Verify that the h1 has text-align set to 'center' and padding of '20px'

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

test("Verify that the h1 has text-align set to 'center' and padding of '20px'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let h1 = body.querySelector(".card h1");
    return (
      window.getComputedStyle(h1).textAlign === "center" &&
      window.getComputedStyle(h1).padding === "20px"
    );
  }, body);

  expect(check).toBeTruthy();
});
