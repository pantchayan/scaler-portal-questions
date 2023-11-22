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

test("Verify that a ticket (div.ticket-cont) is added to div.main-cont when 'shift' key is pressed.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  // const addBtn = await page.$("body");
  await page.waitForSelector('textarea.textArea-cont');
  await page.click("textarea.textArea-cont");
  page.keyboard.press("Shift");

  const check = await page.evaluate((body) => {
    let mainCont = body.querySelector("div.main-cont");

    return mainCont.contains(body.querySelector("div.ticket-cont"));
  }, bodyHandle);

  expect(check).toBeTruthy();
});
