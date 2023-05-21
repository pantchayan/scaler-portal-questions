// Description:
// Verify that a.btn have padding from top and bottom set to 15px and from right and left set to 25px

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

test("Verify that a.btn have padding from top and bottom set to 15px and from right and left set to 25px", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let btns = body.querySelectorAll("a.btn");
    return (
      window.getComputedStyle(btns[0]).padding == "15px 25px" &&
      window.getComputedStyle(btns[1]).padding == "15px 25px"
    );
  }, body);

  expect(check).toBeTruthy();
});
