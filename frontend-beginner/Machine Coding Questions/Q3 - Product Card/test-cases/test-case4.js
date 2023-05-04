// Description:
// Verify that the cards hold correct rating count.
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

test("Verify that the cards hold correct rating count.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let allCards = body.querySelectorAll(".card");
    return (
      allCards[0].querySelector(".rating__count span").innerText == "120" &&
      allCards[1].querySelector(".rating__count span").innerText == "259"
    );
  }, bodyHandle);
  expect(check).toBeTruthy();
});
