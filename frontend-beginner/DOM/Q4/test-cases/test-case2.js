// Description:
// Verify that the data-color attribute is set to 'used' after double clicking
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

test("Verify that the data-color attribute is set to 'used' after double clicking", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  await page.evaluate((body) => {
    var targLink = body.querySelector("div");
    var clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("dblclick", true, true);
    targLink.dispatchEvent(clickEvent);
  }, bodyHandle);

  const check = await page.evaluate((body) => {
    let div = body.querySelector("div");

    return div.getAttribute("data-color") == "used";
  }, bodyHandle);

  expect(check).toBeTruthy();
});
