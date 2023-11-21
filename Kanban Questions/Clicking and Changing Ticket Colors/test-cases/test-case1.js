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

test("Verify that ticket color gets changed when clicked on it.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  // const addBtn = await page.$("body");

  const check = await page.evaluate((body) => {
    let ticketColorBand = body.querySelector("div.ticket-color");
    ticketColorBand.click();

    return (
      window.getComputedStyle(ticketColorBand).backgroundColor ===
      "rgb(144, 238, 144)"
    );
  }, bodyHandle);

  expect(check).toBeTruthy();
});
