// Description:
// Verify that a.btn have the value of transition property set to 'transform 0.3s, color 0.3s, background-color 0.3s'

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

test("Verify that h2::after has display property set to block and border-bottom set as 'solid'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let h2 = body.querySelector("h2");
    return (
      window.getComputedStyle(h2, ":after").display == "block" &&
      window.getComputedStyle(h2, ":after").borderBottom.includes("solid")
    );
  }, body);

  expect(check).toBeTruthy();
});
