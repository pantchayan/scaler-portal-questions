// Description:
// Verify that the text '/month' in h4 span has a color of 'gray' and font-size of '15px'

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

test("Verify that the text '/month' in h4 span has a color of 'gray' and font-size of '15px' ", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let h4 = body.querySelector(".card h4 span");
    return (
      window.getComputedStyle(h4).color === "rgb(128, 128, 128)" &&
      window.getComputedStyle(h4).fontSize === "15px"
    );
  }, body);

  expect(check).toBeTruthy();
});
