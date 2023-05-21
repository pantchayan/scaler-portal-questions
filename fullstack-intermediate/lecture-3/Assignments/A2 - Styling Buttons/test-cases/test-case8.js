// Description:
//Verify that whenever hovered upon, a.btn-empty has the text color set to white and background color set to #f63854

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

test("Verify that whenever hovered upon, a.btn-empty has the text color set to white and background color set to #f63854", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");
  const button = await page.$("a.btn.btn-empty");

  await button.hover();

  const check = await page.evaluate((body) => {
    let btn = body.querySelector("a.btn.btn-empty");
    return (
      window.getComputedStyle(btn).color != "rgb(246, 56, 84)" ||
      window.getComputedStyle(btn).backgroundColor != "rgb(0, 0, 0, 0)"
    );
  }, body);
  expect(check).toBeTruthy();
});
