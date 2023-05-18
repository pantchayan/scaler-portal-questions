// Description:
// Verify that for the div.card the height and width is 400px each

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

test("Verify that for the div.card the height and width is 400px each", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  
  const body = await page.$("body");

  const check = await page.evaluate((body) => {
    let div = body.querySelector(".card");
    return (
      window.getComputedStyle(div).width == "400px" &&
      window.getComputedStyle(div).width === "400px"
    );
  }, body);

  expect(check).toBeTruthy();
});
