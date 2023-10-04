// Description:
// Verify both divs have absolute positioning
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

test("Verify both divs have absolute positioning", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div1 = body.querySelector("div.element1");
    let div2 = body.querySelector("div.element2");

    return (
      window.getComputedStyle(div1).position === "absolute" &&
      window.getComputedStyle(div2).position === "absolute"
    );
  }, body);

  expect(check).toBeTruthy();
});
