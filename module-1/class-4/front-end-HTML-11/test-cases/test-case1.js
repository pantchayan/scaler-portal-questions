// Description:
// Verify if the box is displayed with a width of 400px and a height of 200px.
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

test("the box is displayed with a width of 400px and a height of 200px.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let box = body.querySelector("box");

    return (
      window.getComputedStyle(box).width === "400px" &&
      window.getComputedStyle(box).height === "200px"
    );
  }, body);

  expect(check).toBeTruthy();
});
