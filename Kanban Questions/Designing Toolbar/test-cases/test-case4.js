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

test("Verify that .action-btn-cont>* has correct CSS", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let element = body.querySelectorAll(".action-btn-cont>*");
    return (
      window.getComputedStyle(element).display === "flex" &&
      window.getComputedStyle(element).alignItems === "center" &&
      window.getComputedStyle(element).justifyContent === "center" &&
      window.getComputedStyle(element).backgroundColor === "rgb(255, 255, 255)"
    );
  }, bodyHandle);

  expect(check).toBeTruthy();
});
