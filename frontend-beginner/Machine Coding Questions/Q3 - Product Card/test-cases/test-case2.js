// Description:
// Verify that a card holds a correct title.
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

test("Verify that a card holds a correct title.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let allCards = body.querySelectorAll(".card");
    return (
      allCards[0].querySelector(".product__name").innerText ==
        "Sample Product 1" &&
      allCards[1].querySelector(".product__name").innerText ==
        "Mens Casual Premium Slim Fit T-Shirts"
    );
  }, bodyHandle);
  expect(check).toBeTruthy();
});
