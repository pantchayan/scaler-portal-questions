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

test("Clicking on an item twice with a 1 second gap in between, adds it twice.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");
  // Get the bounding box of the element to perform the double-click
  const elementHandle = await page.$(
    "body > div.container > div:nth-child(4) > button"
  );

  await elementHandle.click({ clickCount: 2 });
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  await delay(1000);
  await elementHandle.click({ clickCount: 2 });

  const check = await page.evaluate(async (body) => {
    let span = body.querySelector("body > div.cart-total > p > span");
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(1000);

    return { total: span.innerHTML, flag: span.innerHTML === "800" };
  }, bodyHandle);
  console.log(check.total);
  expect(check.flag).toBeTruthy();
});
