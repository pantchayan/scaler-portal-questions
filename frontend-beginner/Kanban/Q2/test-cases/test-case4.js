// Description:
// Verify that when the state is unlocked, the task is editable.
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

test("Verify that when the state is unlocked, the task is editable.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const button = await page.$(".ticket-cont button");
  await button.click();

  const check = await page.evaluate((body) => {
    let taskArea = body.querySelector(".task-area");
    return taskArea.contentEditable == "true";
  }, bodyHandle);

  expect(check).toBeTruthy();
});
