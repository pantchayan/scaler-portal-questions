// Description:
// Verify that when the state is locked, the task is uneditable.
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

test("Verify that when the state is locked, the task is uneditable.", async () => {
  const page = await browser.newPage();
  await page.goto("http://localhost:8080");

  const bodyHandle = await page.$("body");

  const check = await page.evaluate((body) => {
    let taskArea = body.querySelector(".task-area");
    return (
      taskArea.contentEditable == "inherit" ||
      taskArea.contentEditable == "false"
    );
  }, bodyHandle);

  expect(check).toBeTruthy();
});