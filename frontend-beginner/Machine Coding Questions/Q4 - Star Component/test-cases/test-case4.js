// Description:
// Verify that when clicked, the Rating Count changes to the star point.
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

test("Verify that when clicked, the Rating Count changes to the star point.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const thirdStar = await page.$("#star-container > span:nth-child(3)");

  await thirdStar.click();

  const check = await page.evaluate((body) => {
    let count = body.querySelector("span#count");

    return count.innerText == "3";
  }, bodyHandle);

  expect(check).toBeTruthy();
});
