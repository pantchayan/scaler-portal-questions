// Description:
// Verify that align-items property is used to control the alignment along the cross axis.
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

test("Verify that align-items property is used to control the alignment along the cross axis.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let box = body.querySelector(".container");

    return window.getComputedStyle(box).alignItems === 'center'
  }, body);

  expect(check).toBeTruthy();
});