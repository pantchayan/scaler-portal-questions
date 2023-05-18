// Description:
// Verify that the text '$399' in h4 has color of '#f63854', font-size of '40px' and font-weight of 500

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

test("Verify that the text '$399' in h4 has color of '#f63854', font-size of '40px' and font-weight of 500", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let h4 = body.querySelector(".card h4");
    return (
      window.getComputedStyle(h4).color === 'rgb(246, 56, 84)' &&
      window.getComputedStyle(h4).fontSize === '40px' && 
      window.getComputedStyle(h4).fontWeight === '500'
    );
  }, body);

  expect(check).toBeTruthy();
});
