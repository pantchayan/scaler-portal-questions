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

test("Verify that .main-cont has correct CSS", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let mainContainer = body.querySelectorAll(".main-cont");
    return (
      window.getComputedStyle(mainContainer).display === "flex" &&
      window.getComputedStyle(mainContainer).justifyContent === "center"
    );
  }, bodyHandle);

  expect(check).toBeTruthy();
});
