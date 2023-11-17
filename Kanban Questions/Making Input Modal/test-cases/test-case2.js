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

test(" Verify that .priority-colors-container has correct CSS", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let colorsContainer = body.querySelector(".priority-colors-container");
    return (
      window.getComputedStyle(colorsContainer).justifyContent ===
        "space-around" &&
      window.getComputedStyle(colorsContainer).alignItems === "center" &&
      window.getComputedStyle(colorsContainer).display === "flex"
    );
  }, bodyHandle);

  expect(check).toBeTruthy();
});
