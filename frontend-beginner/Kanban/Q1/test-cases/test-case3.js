// Description:
// Verify that clicking on lightblue color box is working.
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

test("Verify that clicking on lightblue color box is working.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const lightBlueBtn = await page.$(".lightblue");
  await lightBlueBtn.click();

  const check = await page.evaluate((body) => {
    let taskElementsArr = body.querySelectorAll(".ticket-cont");
    return (
      taskElementsArr.length == 1 &&
      taskElementsArr[0].children[2].innerText == "This is task 3 (lightblue)"
    );
  }, bodyHandle);

  expect(check).toBeTruthy();
});
