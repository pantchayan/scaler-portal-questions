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

test("Verify that .toolbox-priority-cont has correct CSS", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let element = body.querySelector(".toolbox-priority-cont");
    return (
      window.getComputedStyle(element).display === "flex" &&
      window.getComputedStyle(element).alignItems === "center" &&
      window.getComputedStyle(element).justifyContent === "space-evenly"&&
      window.getComputedStyle(element).backgroundColor === "rgb(61, 61, 61)"
    );
  }, bodyHandle);

  expect(check).toBeTruthy();
});
