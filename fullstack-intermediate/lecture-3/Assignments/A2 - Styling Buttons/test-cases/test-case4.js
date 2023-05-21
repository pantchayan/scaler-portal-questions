// Description:
// Verify that a.btn have border-radius of 64px and border of 1px, solid, #f63854 value

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

test("Verify that a.btn have border-radius of 64px and border of 1px, solid, #f63854 value", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let btns = body.querySelectorAll("a.btn");
    return (
      window.getComputedStyle(btns[0]).border.includes("solid") &&
      window.getComputedStyle(btns[1]).border.includes("solid") &&
      window.getComputedStyle(btns[0]).border.includes("rgb(246, 56, 84)") &&
      window.getComputedStyle(btns[1]).border.includes("rgb(246, 56, 84)") &&
      window.getComputedStyle(btns[0]).borderRadius === "64px" &&
      window.getComputedStyle(btns[1]).borderRadius === "64px"
    );
  }, body);

  expect(check).toBeTruthy();
});
