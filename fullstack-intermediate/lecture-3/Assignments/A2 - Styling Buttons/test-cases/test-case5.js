// Description:
// Verify that a.btn have the value of transition property set to 'transform 0.3s, color 0.3s, background-color 0.3s'

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

test("Verify that a.btn have the value of transition property set to 'transform 0.3s, color 0.3s, background-color 0.3s'", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let btns = body.querySelectorAll("a.btn");
    return (
      window.getComputedStyle(btns[0]).transition.includes("transform 0.3s") &&
      window.getComputedStyle(btns[1]).transition.includes("transform 0.3s") &&
      window.getComputedStyle(btns[0]).transition.includes("color 0.3s") &&
      window.getComputedStyle(btns[1]).transition.includes("color 0.3s") &&
      window
        .getComputedStyle(btns[0])
        .transition.includes("background-color 0.3s") &&
      window
        .getComputedStyle(btns[1])
        .transition.includes("background-color 0.3s")
    );
  }, body);

  expect(check).toBeTruthy();
});
