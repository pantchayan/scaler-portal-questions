// Description:
// Verify that div.element1 has height and width of 100px

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

test("Verify that div.element1 has height and width of 100px", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");
  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div1 = body.querySelector("div.element1");

    return (
      window.getComputedStyle(div1).height === "100px" &&
      window.getComputedStyle(div1).width === "100px"
    );
  }, body);

  expect(check).toBeTruthy();
});
