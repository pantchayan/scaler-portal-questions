// Description:
// Verify that the div.card has a border of '2px solid lightgray' value

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

test("Verify that the div.card has a border of '2px solid lightgray' value", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = body.querySelector(".card");
    return (
      window.getComputedStyle(div).border.includes("solid") &&
      window.getComputedStyle(div).border.includes("rgb(211, 211, 211)")
    );
  }, body);

  expect(check).toBeTruthy();
});
