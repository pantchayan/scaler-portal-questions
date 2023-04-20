// Description:
// Verify that the Background color of element with 'special' id is 'hsl(120, 100%, 50%)'

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

test("background color of #special element is 'hsl(120, 100%, 50%)'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let pHandle = body.querySelector("#special");

    return (
      window.getComputedStyle(pHandle).backgroundColor === "rgb(0, 255, 0)"
    );
  }, body);

  expect(check).toBeTruthy();
});
