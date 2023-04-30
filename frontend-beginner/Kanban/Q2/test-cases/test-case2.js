// Description:
// Verify that clicking on unlock icon changes it to lock icon.
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

test("Verify that clicking on unlock icon changes it to lock icon.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const button = await page.$(".ticket-cont button");
  await button.click();
  await button.click();

  const check = await page.evaluate((body) => {
    let buttonC = body.querySelector(".ticket-cont button");
    return buttonC.innerText === "Locked";
  }, bodyHandle);

  expect(check).toBeTruthy();
});
