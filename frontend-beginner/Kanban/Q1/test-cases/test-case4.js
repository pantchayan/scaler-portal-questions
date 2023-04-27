// Description:
// Verify that clicking on black color box is working.
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

test("Verify that clicking on black color box is working.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const blackBtn = await page.$(".black");
  await blackBtn.click();

  const check = await page.evaluate((body) => {
    let taskElementsArr = body.querySelectorAll(".ticket-cont");
    return (
      taskElementsArr.length == 1 &&
      taskElementsArr[0].children[2].innerText == "This is task 2 (black)"
    );
  }, bodyHandle);

  expect(check).toBeTruthy();
});
