// Description:
// Verify the top and left position for div.elements1 to be 20px

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

test("Verify the top and left position for div.elements1 to be 20px", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");
  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div1 = body.querySelector("div.element1");

    return (
      window.getComputedStyle(div1).top === "20px" &&
      window.getComputedStyle(div1).left === "20px"
    );
  }, body);

  expect(check).toBeTruthy();
});
