// Description:
// A single alert is generated when any of the box is clicked.
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

test("A single alert is generated when any of the box is clicked.", async () => {
  const page = await browser.newPage();

  let flag = true;
  let count = 0;
  page.on("dialog", async (dialog) => {
    count++;
    console.log("Alert is generated " + count + " time");
    if (count == 2) {
      flag = false;
    }
    await dialog.accept();
  });

  await page.goto("http://localhost:8080");

  const yellowBox = await page.$(".yellow");
  await yellowBox.click();

  expect(flag).toBeTruthy();
});
