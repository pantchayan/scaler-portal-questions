// Description:
// Verify that the program alerts as 'yellow is clicked' when the yellow box is clicked.
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

test("Verify that the program alerts as 'yellow is clicked' when the yellow box is clicked.", async () => {
  const page = await browser.newPage();

  let flag = false;
  page.on("dialog", async (dialog) => {
    //get alert message
    let alertMsg = dialog.message();
    console.log(alertMsg);
    if (alertMsg == "yellow is clicked") {
      flag = true;
    }
    await dialog.accept();
  });

  await page.goto("http://localhost:8080");

  const yellowBox = await page.$(".yellow");
  await yellowBox.click();

  expect(flag).toBeTruthy();
});
