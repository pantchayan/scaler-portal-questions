// Description:
// Verify that double clicking on any of the color box is working.
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

test("Verify that double clicking on any of the color box is working.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  await page.evaluate((body) => {
    var targLink = body.querySelector(".color");
    var clickEvent = document.createEvent("MouseEvents");
    clickEvent.initEvent("dblclick", true, true);
    targLink.dispatchEvent(clickEvent);
  }, bodyHandle);

  const check = await page.evaluate((body) => {
    let taskElementsArr = body.querySelectorAll(".ticket-cont");
    return taskElementsArr.length == 4;
  }, bodyHandle);

  expect(check).toBeTruthy();
});
